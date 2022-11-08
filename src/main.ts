import { EffectVariant, ModCallback } from "isaac-typescript-definitions";
//import { printConsole } from "isaacscript-common";

import * as json from "json";
import { IRFconfig } from "./scripts/Config"
import { FFCompatibility } from "./scripts/FiendFolio";
import { SwampyCompatibility } from "./scripts/Swampy";
import { RevCompatibility } from "./scripts/Rev";
import { VanillaElseIfHell } from "./scripts/Vanilla"
import {IHateDelirium} from "./scripts/DeliriumHell"
import {ModConfig} from "./scripts/modConfigMenu"
import { printConsole } from "isaacscript-common";
interface DangerData {
  Danger: int | undefined;
  ZoneLink: unknown | undefined;
}

let ActiveEnemy = [] as Entity[];
let ActiveZone = [] as Entity[];
let ActiveProjectile = [] as Entity[];
declare const ModConfigMenu: unknown | undefined;
//Compatibility
declare const BetterMonsters: unknown | undefined;
declare const FiendFolio: unknown | undefined;
declare const SWAMPY: unknown | undefined;
declare const REVEL: unknown | undefined;

let debugEntity : Entity | undefined;
let debugSprite : Sprite | undefined;
let debugData : unknown | undefined;

main();

function debugComing (ent, sprite, data){
  if(ent){
    debugEntity = ent
  }
  if(sprite){
    debugSprite = sprite
  }
  if(data){
    debugData = data
  }
}
function debugTextCOming(){

  if(IRFconfig.Debug == true){
    if(debugEntity !== undefined){
      Isaac.RenderText(`entity type : ${debugEntity.Type}, variant : ${debugEntity.Variant}, health : ${debugEntity.HitPoints}`, 50, 30, 255, 255, 255, 255)
    }else{
      Isaac.RenderText(`No entity `, 50, 30, 255, 255, 255, 255)
    }
    if(debugSprite !== undefined){
      Isaac.RenderText(`Playing : ${debugSprite.GetAnimation()}, frame : ${debugSprite.GetFrame()}`, 50, 40, 255, 255, 255, 255)
    }else{
      Isaac.RenderText(`No entity playing`, 50, 40, 255, 255, 255, 255)
    }
  }
}

function spawnTracer(ent) {
  let data = ent.GetData() as DangerData; //!This is a security, prevents some entity from having multiple zones

  if(data.Danger == 1)
    return;
  let effect = Isaac.Spawn(1000, EffectVariant.GENERIC_TRACER, 0, ent.Position, Vector(0,0), ent).ToEffect()
  // effect.PositionOffset = -DefaultTracerOffset
  //effect.Color = Color(150, 0, 0, 1, 0, 0, 0);
  // effect.SpriteScale = Vector(1,0.2)
  effect.SpriteScale = 200
  effect.LifeSpan = 25;
  effect.Timeout = effect.LifeSpan
  effect.TargetPosition = Vector(0,99999)
  data.Danger = 1;
  effect.Update()

}

function removeDanger(data){

    data.ZoneLink.Remove();
    data.Danger = 0;


}

function spawnProjectileDanger(Projectile){
  let data = Projectile.GetData() as DangerData;
  let anim = Isaac.Spawn(1000, 8745, 0, Projectile.Position, Vector(0,0), undefined)
  //anim.ToEffect().FollowParent(Projectile)
  // anim.SetSize(-50, Vector(1,1), 0)
  anim.SpriteScale = Vector(0.05*Projectile.Size, 0.05*Projectile.Size)
  anim.Parent = Projectile
  ActiveProjectile.push(anim)
  data.Danger = 1;
}

function spawnDanger(entity, scale?, adjust?){

  let data = entity.GetData() as DangerData; //!This is a security, prevents some entity from having multiple zones
  if(data.Danger == 1)
    return;
  let anim = Isaac.Spawn(1000, 8745, 0, Vector(entity.Position.X, entity.Position.Y), Vector(0,0), undefined) //* spawn the animation
  //anim.ToNPC().CanShutDoors = false
  anim.RenderZOffset =  -6999
  anim.ToEffect().FollowParent(entity) //*make the animation follow the trigger entity
  if(adjust){ //*Some mob have a small size, this condition is used in case an adjustment is needed.
    anim.SpriteScale = Vector(scale*entity.Size, adjust*entity.Size) //* make the animation scale with the entity size
  }else if(scale && !adjust){ //*used in rly rare case
    anim.SpriteScale = Vector(scale*entity.Size, scale*entity.Size)
  }else{
    anim.SpriteScale = Vector(0.0225*entity.Size, 0.0225*entity.Size)//*Randomly found number, with this value, the area is a bit bigger than the mob in majority
  }
  anim.Parent = entity //* make the animation parent the trigger entity, for the suppression
  ActiveZone.push(anim) //* activeZone used to retrieve the animation later

  data.ZoneLink = anim
  data.Danger = 1; //! After the DangerZone is created, the parent entity is set to 1 for safety
}

function postRender(){
  ActiveEnemy.forEach(ent => {
    let data = ent.GetData() as unknown as DangerData;
    let EntSprite = ent.GetSprite()
    debugComing(ent, EntSprite, data)
    //!check some special Vanilla entity end of stomp & "normal" stop action
    if(data.Danger == 1 && ent.Type !== 412  && (EntSprite.IsEventTriggered( "Land" ) || EntSprite.IsEventTriggered( "Appear" ) || EntSprite.IsEventTriggered( "Stomp" )|| EntSprite.IsEventTriggered( "Landed" )||((ent.Type == 68||ent.Type == 45) && EntSprite.IsEventTriggered( "Shoot" ))||((ent.Type == 209 || ent.Type == 854)&& EntSprite.IsEventTriggered( "Hit" )))){
      removeDanger(data)
    }
    VanillaElseIfHell(ent, EntSprite, spawnDanger, data, removeDanger, IRFconfig, spawnTracer)

    if(IRFconfig.Delirium){
      IHateDelirium(ent, EntSprite, spawnDanger, data, removeDanger, IRFconfig)
    }
    //mod compatibility
    if(FiendFolio !== undefined ){
      FFCompatibility(ent, EntSprite, spawnDanger, data, removeDanger, IRFconfig)
    }

    if(SWAMPY !== undefined ){
      SwampyCompatibility(ent, EntSprite, spawnDanger, data, removeDanger, IRFconfig)
    }
    if(REVEL !== undefined ){
      RevCompatibility(ent, EntSprite, spawnDanger, data, removeDanger, IRFconfig)
    }
  });
  //! security
  ActiveZone.forEach(zone => {
    if(zone?.Parent?.IsDead() ||!zone?.Parent?.Exists()){
      zone.Remove();
    }
  });
}

function postUpdate(){
  let entities = Isaac.GetRoomEntities();
  let enemy = [] as Entity[];
  if(entities.length === 0){
  //  DebugText = "no entity"
  } else {
    entities.forEach(ent => {                                                 //rev glasstro
    if(ent.IsActiveEnemy(true) || (ent.Type == 1000 && ent.Variant == 29) || (ent.Type == 1000 && ent.Variant == 3480)){
      //printConsole(`${ent}`)
      enemy.push(ent);
    }
  });
}
  ActiveEnemy = enemy;
}

function ProjectileDetect(Projectile){

  let data = Projectile.GetData() as DangerData;;
  if(IRFconfig.MonsnoowProjectile == true && Projectile.Variant == 4){
    if(Projectile.Height < -300){
        if(data.Danger !== 1){
          //printConsole(`hauteur: ${Projectile.Height} variant: ${Projectile.Variant} scale: ${Projectile.Scale}`)
          spawnProjectileDanger(Projectile)
        }
    }
  }
  if(IRFconfig.AllProjectile == true){
    if(Projectile.Height < -200){
        if(data.Danger !== 1){
          spawnProjectileDanger(Projectile)
        }
    }
  }
  if(IRFconfig.RockFall == true){
    if(Projectile.Height < -200 && Projectile.Variant == 9){
      if(data.Danger !== 1){
        //printConsole(`${Projectile.CurvingStrength}`)
        spawnProjectileDanger(Projectile)
      }
    }
  }
}

function ProjectileCalculation(){
  if(ActiveProjectile){
    ActiveProjectile.forEach(p => {
      if(!p?.Parent?.Exists()){
          p.Remove();
        } else {
          p.Position = p.Parent.Position;
        }
    });
  }
}

//! clean data
function cleaner(){
  if(ActiveEnemy){
    //printConsole(`trigger enemy`)
    ActiveEnemy = []
  }
  if(ActiveZone){
    //printConsole(`trigger zone`)
    ActiveZone = []
  }
  if(ActiveProjectile){
    //printConsole(`trigger projectile`)
    ActiveProjectile = []
  }
}


function main() {
  // Instantiate a new mod object, which grants the ability to add callback functions that
  // correspond to in-game events.
  const mod = RegisterMod("Coming Down!", 1);

  //! MOD CONFIG MENU
  //steal on another mod, idk how it's work
  function postGameStarted() {
    if (mod.HasData()) {
      const loadedFromSave = json.decode(Isaac.LoadModData(mod)) as Record<
        string,
        any
      >;

      for (const [k, v] of pairs(loadedFromSave)) {
        IRFconfig[k] = v;
      }
    }
  }

  function preGameExit() {
    mod.SaveData(json.encode(IRFconfig));
  }


  mod.AddCallback(ModCallback.PRE_GAME_EXIT, preGameExit)
  mod.AddCallback(ModCallback.POST_GAME_STARTED, postGameStarted);

  if(ModConfigMenu !== undefined) {
      ModConfig(IRFconfig);
  }
  //! END MOD CONFIG MENU

  mod.AddCallback(ModCallback.POST_NEW_ROOM, cleaner)
  mod.AddCallback(ModCallback.PRE_GAME_EXIT, cleaner)
  mod.AddCallback(ModCallback.POST_EFFECT_UPDATE, ProjectileCalculation, 8745)
  mod.AddCallback(ModCallback.POST_UPDATE, postRender);
  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate)
  mod.AddCallback(ModCallback.POST_PROJECTILE_RENDER, ProjectileDetect)
  mod.AddCallback(ModCallback.POST_RENDER, debugTextCOming)
}
