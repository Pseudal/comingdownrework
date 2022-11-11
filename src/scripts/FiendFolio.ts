//To avoid generating errors and as Typescript apparently prefers, I will also manage the deletion here, directly with the entities
export function FFCompatibility(ent, EntSprite, spawnDanger, data, remove, IRFconfig):void {
    //slammer & wimpy & s'more & smasher & stoney & all other variant...
  if ((ent.Type == 151  || ent.Type == 114 || ent.Type == 750)&& EntSprite.IsPlaying("Jump") && IRFconfig.Slammer){
    let scale = 0.020
    if(EntSprite.IsEventTriggered ( "GetPlayer" ) || EntSprite.IsEventTriggered ( "Jump")){
      if(ent.Variant == 2) //Stony zone is small
        scale = 0.035
      spawnDanger(ent, scale)
      return
    }
  }
    //other slammer...... man rly.. can you follow a convention or anything else ? why the same pattern mob go from "getplayer" to "jump" ? franchement c'est relou... putain pourquoi jumpup maintenant ? 
  if (((ent.Type == 114) && (ent.Variant == 39 || ent.Variant == 31|| ent.Variant == 42|| ent.Variant == 140))&& (EntSprite.IsPlaying("Jump") || EntSprite.IsPlaying("JumpUp")) && IRFconfig.Slammer){
    let scale = 0.020
    if(EntSprite.IsEventTriggered ( "Jump")){
      spawnDanger(ent, scale)
      return
    }
    //Poobottle & drainfly
  }else if ((ent.Type == 160 && (ent.Variant == 560 || ent.Variant == 561)) && IRFconfig.Poobottle){
    if(EntSprite.IsPlaying("Target")){
      if(EntSprite.GetFrame() == 7){
        spawnDanger(ent)
        return
      }
    }
    if(EntSprite.IsPlaying("Impact")){
      if(EntSprite.GetFrame() == 1){
        remove(data)
        return
      }
    }
  }//Diplet
  else if ((ent.Type == 160 && ent.Variant == 150) && IRFconfig.Diplet){
    if(EntSprite.IsPlaying("Fall")){
      if(EntSprite.GetFrame() == 1){
        spawnDanger(ent, 0.05)
        return
      }
    }
    if(EntSprite.IsPlaying("Land")){
      if(EntSprite.GetFrame() == 1){
        remove(data)
        return
      }
    }
  }//Battie
  else if ((ent.Type == 180 && ent.Variant == 10) && IRFconfig.Battie){
    if(EntSprite.IsPlaying("FlyDown")){
      if(EntSprite.GetFrame() == 1){
        spawnDanger(ent)
        return
      }
    }
    if(EntSprite.IsPlaying("FlyDown")){
      if(EntSprite.GetFrame() == 10){
        remove(data)
        return
      }
    }
  }//monsoon
  else if ((ent.Type == 180 && ent.Variant == 40) && IRFconfig.Monsoon){
    if(EntSprite.IsPlaying("FallLoop") || EntSprite.IsPlaying("SmallFallLoop")){
      if(EntSprite.GetFrame() == 1){
        spawnDanger(ent)
        return
      }
    }
  }//peeping
  else if ((ent.Type == 180 && ent.Variant == 91) && IRFconfig.Peeping){
    if(EntSprite.IsPlaying("Appear")){
      if(EntSprite.GetFrame() == 1){
        spawnDanger(ent, 0.04)
        return
      }
    }
  }//Tsar //!This boss is very strange, for some reason, the automatic detection for deletion does not work and the boss is broken at home
  else if ((ent.Type == 180 && ent.Variant == 180) && IRFconfig.Tsar){
    if(EntSprite.IsPlaying("LandToJump") || EntSprite.IsPlaying("Land") ){
      if(EntSprite.GetFrame() == 1){
        remove(data)
        return
      }
    }
    if(EntSprite.IsPlaying("JumpStart") || EntSprite.IsPlaying("LandToJump")){
      if(EntSprite.IsEventTriggered ( "Jump" )){
        spawnDanger(ent)
        return
      }
    }
  }//Dusk
  else if ((ent.Type == 180 && ent.Variant == 171) && IRFconfig.Dusk){
    if(EntSprite.IsPlaying("SmashLand")){
      if(EntSprite.GetFrame() == 2){
        remove(data)
        return
      }
    }
    if(EntSprite.IsPlaying("SmashIdle")){
       if(EntSprite.GetFrame() == 1){
        spawnDanger(ent, 0.03)
        return
      }
    }
  }
  else if ((ent.Type == 450 && ent.Variant == 9 ) && IRFconfig.Dusk){
    if(EntSprite.IsPlaying("Spit")){
       if(EntSprite.GetFrame() == 26){
        spawnDanger(ent, 0.03)
        return
      }
    }
  }
}