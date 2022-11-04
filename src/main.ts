import { ModCallback } from "isaac-typescript-definitions";
//import { printConsole } from "isaacscript-common";

import * as json from "json";
import { FFCompatibility } from "./scripts/FiendFolio";
import { SwampyCompatibility } from "./scripts/Swampy";
import { VanillaElseIfHell } from "./scripts/Vanilla"
import {IHateDelirium} from "./scripts/DeliriumHell"
import {ModConfig} from "./scripts/modConfigMenu"
import { printConsole } from "isaacscript-common";
interface DangerData {
  Danger: int | undefined;
  ZoneLink: unknown | undefined;
}
let DebugText = "";
let ActiveEnemy = [] as Entity[];
let ActiveZone = [] as Entity[];
let ActiveProjectile = [] as Entity[];
declare const ModConfigMenu: unknown | undefined;
declare const BetterMonsters: unknown | undefined;
declare const FiendFolio: unknown | undefined;
declare const SWAMPY: unknown | undefined;
let IRFconfig = {
  FatSack: true,
  Leaper: true,
  Monstro: true,
  Mom: true,
  Peep: true,
  blastocyst: true,
  Daddy: true,
  MomHand: true,
  MegaFatty: true,
  ALeach: true,
  Beelzeblub: true,
  Singe: true,
  Adversary: true,
  Delirium: true,
  MegaSatan: true,
  UltraGreed:true,
  GreedCoin:true,
  Mother: false,
  //Fiend Folio
  Slammer: true,
  Poobottle: true,
  Diplet: true,
  Battie: true,
  Monsoon: true,
  Peeping: true,
  Tsar: true,
  Dusk: true,
  RockFall: true,
  AllProjectile: false,
  //Splashy
  Splashy: true,
  RogHorn: true,
}
main();

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
    //!check some special Vanilla entity end of stomp & normal stop action
    if(data.Danger == 1 && ent.Type !== 412  && (EntSprite.IsEventTriggered( "Land" ) || EntSprite.IsEventTriggered( "Appear" ) || EntSprite.IsEventTriggered( "Stomp" )|| EntSprite.IsEventTriggered( "Landed" )||((ent.Type == 68||ent.Type == 45) && EntSprite.IsEventTriggered( "Shoot" ))||((ent.Type == 209 || ent.Type == 854)&& EntSprite.IsEventTriggered( "Hit" )))){
      removeDanger(data)
    }
    VanillaElseIfHell(ent, EntSprite, spawnDanger, data, removeDanger, IRFconfig)
    if(IRFconfig.Delirium){
      IHateDelirium(ent, EntSprite, spawnDanger, data, removeDanger, IRFconfig)
    }

    if(FiendFolio !== undefined ){
      FFCompatibility(ent, EntSprite, spawnDanger, data, removeDanger, IRFconfig)
    }
    //Small mod compatibility
    if(SWAMPY !== undefined ){
      SwampyCompatibility(ent, EntSprite, spawnDanger, data, removeDanger, IRFconfig)
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
    entities.forEach(ent => {
    if(ent.IsActiveEnemy(true) || (ent.Type == 1000 && ent.Variant == 29)){
      //printConsole(`${ent}`)
      enemy.push(ent);
    }
  });
}
  ActiveEnemy = enemy;
}

function ProjectileDetect(Projectile){

  let data = Projectile.GetData() as DangerData;;
  if(IRFconfig.AllProjectile == true){
    if(Projectile.Height < -200){
        if(data.Danger != 1){
          //printConsole(`${Projectile.Height}`)
          spawnProjectileDanger(Projectile)
        }
    }
  }
  if(IRFconfig.RockFall == true){
    if(Projectile.Height < -200 && Projectile.Variant == 9){
      if(data.Danger != 1){
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
  mod.AddCallback(ModCallback.POST_PROJECTILE_UPDATE, ProjectileDetect)




  // Print a message to the "log.txt" file.
  //Isaac.DebugString(`${MOD_NAME} initialized.`);
}