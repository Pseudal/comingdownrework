import { ModCallback, ProjectileVariant } from "isaac-typescript-definitions";
import { printConsole } from "isaacscript-common";

//To avoid generating errors and as Typescript apparently prefers, I will also manage the deletion here, directly with the entities
export function FFCompatibility(ent, EntSprite, spawnDanger, data, remove, IRFconfig):void {
    //slammer & wimpy & s'more & smasher & stoney & all other variant...
  if (ent.Type == 151 && EntSprite.IsPlaying("Jump") && IRFconfig.Slammer){
    let scale = 0.020
    if(EntSprite.IsEventTriggered ( "GetPlayer" )){
      if(ent.Variant == 2) //Stony zone is small
        scale = 0.035
      spawnDanger(ent, scale)
    }
    //Poobottle & drainfly
  }else if ((ent.Type == 160 && (ent.Variant == 560 || ent.Variant == 561)) && IRFconfig.Poobottle){
    if(EntSprite.IsPlaying("Target")){
      if(EntSprite.GetFrame() == 7){
        spawnDanger(ent)
      }
    }
    if(EntSprite.IsPlaying("Impact")){
      if(EntSprite.GetFrame() == 1){
        remove(data)
      }
    }
  }//Diplet
  else if ((ent.Type == 160 && ent.Variant == 150) && IRFconfig.Diplet){
    if(EntSprite.IsPlaying("Fall")){
      if(EntSprite.GetFrame() == 1){
        spawnDanger(ent, 0.05)
      }
    }
    if(EntSprite.IsPlaying("Land")){
      if(EntSprite.GetFrame() == 1){
        remove(data)
      }
    }
  }//Battie
  else if ((ent.Type == 180 && ent.Variant == 10) && IRFconfig.Battie){
    if(EntSprite.IsPlaying("FlyDown")){
      if(EntSprite.GetFrame() == 1){
        spawnDanger(ent)
      }
    }
    if(EntSprite.IsPlaying("FlyDown")){
      if(EntSprite.GetFrame() == 10){
        remove(data)
      }
    }
  }//monsoon
  else if ((ent.Type == 180 && ent.Variant == 40) && IRFconfig.Monsoon){
    if(EntSprite.IsPlaying("FallLoop") || EntSprite.IsPlaying("SmallFallLoop")){
      if(EntSprite.GetFrame() == 1){
        spawnDanger(ent)
      }
    }
  }//peeping
  else if ((ent.Type == 180 && ent.Variant == 91) && IRFconfig.Peeping){
    if(EntSprite.IsPlaying("Appear")){
      if(EntSprite.GetFrame() == 1){
        spawnDanger(ent, 0.04)
      }
    }
  }//Tsar //!This boss is very strange, for some reason, the automatic detection for deletion does not work and the boss is broken at home
  else if ((ent.Type == 180 && ent.Variant == 180) && IRFconfig.Tsar){
    if(EntSprite.IsPlaying("LandToJump") || EntSprite.IsPlaying("Land") ){
      if(EntSprite.GetFrame() == 1){
        remove(data)
      }
    }
    if(EntSprite.IsPlaying("JumpStart") || EntSprite.IsPlaying("LandToJump")){
      if(EntSprite.IsEventTriggered ( "Jump" )){
        spawnDanger(ent)
      }
    }
  }//Dusk
  else if ((ent.Type == 180 && ent.Variant == 171) && IRFconfig.Dusk){
    if(EntSprite.IsPlaying("SmashLand")){
      if(EntSprite.GetFrame() == 2){
        remove(data)
      }
    }
    if(EntSprite.IsPlaying("SmashIdle")){
       if(EntSprite.GetFrame() == 1){
        spawnDanger(ent, 0.03)
      }
    }
  }
}