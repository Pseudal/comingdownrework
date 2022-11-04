import { printConsole } from "isaacscript-common";

declare const BetterMonsters: unknown | undefined;

//! I hate Delirium
export function IHateDelirium(ent, EntSprite, spawnDanger, data, remove, IRFconfig):void {
  //leaper
  if (ent.Type == 412 && IRFconfig.Delirium){
    //printConsole(`${EntSprite.GetAnimation()} ${EntSprite.GetFrame()}`)
      //mom & satan
      if(EntSprite.IsPlaying("Stomp")){
        if(EntSprite.GetFrame() < 29 )
            spawnDanger(ent)
        if((EntSprite.IsPlaying("Stomp") && EntSprite.GetFrame() >= 30 )|| EntSprite.IsFinished("Stomp")){
          if(data.ZoneLink !== undefined)
            remove(data)
        }
      }
      //Monstro & peep
      if(EntSprite.IsPlaying("JumpDown")){
        if(EntSprite.GetFrame() < 29 )
            spawnDanger(ent)
        if((EntSprite.IsPlaying("JumpDown") && EntSprite.GetFrame() >= 30 )|| EntSprite.IsFinished("JumpDown")){
          if(data.ZoneLink !== undefined)
            remove(data)
        }
      }
      //Daddy
      if(!BetterMonsters !== undefined){
        if(EntSprite.IsPlaying("StompArm") || EntSprite.IsPlaying("StompLeg")|| EntSprite.IsPlaying("Down")){
          if(EntSprite.GetFrame() < 10 )
              spawnDanger(ent)
          if(((EntSprite.IsPlaying("StompArm")|| EntSprite.IsPlaying("StompLeg")|| EntSprite.IsPlaying("Down")) && EntSprite.GetFrame() >= 11 )|| EntSprite.IsFinished("StompArm")||EntSprite.IsFinished("StompLeg")||EntSprite.IsFinished("Down")){
            if(data.ZoneLink !== undefined)
              remove(data)
          }
        }
      }else{
        if(EntSprite.IsPlaying("StompArm") || EntSprite.IsPlaying("StompLeg")|| EntSprite.IsPlaying("Up")){
          if(EntSprite.GetFrame() < 10 )
              spawnDanger(ent)
          if(((EntSprite.IsPlaying("StompArm")|| EntSprite.IsPlaying("StompLeg")|| EntSprite.IsPlaying("Down")) && EntSprite.GetFrame() >= 11 )|| EntSprite.IsFinished("StompArm")||EntSprite.IsFinished("StompLeg")||EntSprite.IsFinished("Down")||(!EntSprite.IsPlaying("Down") && EntSprite.IsFinished("Up"))){
            if(data.ZoneLink !== undefined)
              remove(data)
          }
        }
      }
      //fatty
      if((EntSprite.IsPlaying("Jumping") && EntSprite.GetFrame() > 8)||( EntSprite.IsPlaying("Landing") && EntSprite.GetFrame() < 10)){
            spawnDanger(ent)

        if((EntSprite.IsPlaying("Landing") && EntSprite.GetFrame() >= 5 )|| EntSprite.IsFinished("Landing")||(!EntSprite.IsPlaying("Jumping") && EntSprite.IsFinished("Landing"))){
          if(data.ZoneLink !== undefined)
            remove(data)
        }
      }
      if((EntSprite.IsPlaying("FlyUp") && EntSprite.GetFrame() > 28)||( EntSprite.IsPlaying("FlyDown") && EntSprite.GetFrame() < 9)){
        spawnDanger(ent, 0.03)

      if((EntSprite.IsPlaying("FlyDown") && EntSprite.GetFrame() >= 10 )|| EntSprite.IsFinished("FlyDown")||(!EntSprite.IsPlaying("FlyUp") && EntSprite.IsFinished("FlyDown"))){
        if(data.ZoneLink !== undefined)
          remove(data)
        }
      }
    }
}
