import { printConsole } from "isaacscript-common";

declare const BetterMonsters: unknown | undefined;

export function VanillaElseIfHell(ent, EntSprite, spawnDanger, data, remove, IRFconfig):void {
  //leaper
  //printConsole(`${EntSprite.GetAnimation()}`)
  if(ent.Type == 34 && EntSprite.IsPlaying("BigJumpUp")){
    if(IRFconfig.Leaper){
      if(EntSprite.IsEventTriggered ( "Jump" )){
        spawnDanger(ent)
      }
    }
    //Monstro & MonstroII & Gish
  }else if ((ent.Type == 20 || ent.Type == 43) && EntSprite.IsPlaying("JumpUp" )){
    if(IRFconfig.Monstro){
      if(EntSprite.IsEventTriggered ( "Jump" )){
        spawnDanger(ent)
      }
    }
    //Mom & Satan stomp
  }else if ((ent.Type == 45 || ent.Type == 84 ||(ent.Type == 1000 && ent.Variant == 29)) && EntSprite.IsPlaying("Stomp" ) && IRFconfig.Mom){
    printConsole(`${EntSprite.GetAnimation()} ${EntSprite.GetOverlayAnimation ()}trigger`)
    let scale = 0.03
      if(EntSprite.GetFrame() <= 12){
        if(ent.Type == 84)
          scale = 0.02
        if(ent.Type == 1000){
          scale = 1.2
        }
        spawnDanger(ent, scale)
      }
    //Peep
  }else if (ent.Type == 68 && EntSprite.IsPlaying("JumpUp") && IRFconfig.Peep){
    if(EntSprite.IsEventTriggered ( "Jump" )){
      spawnDanger(ent)
    }
    //blastocyst
  }else if ((ent.Type == 74||ent.Type == 75||ent.Type == 76) && EntSprite.IsPlaying("JumpUp") && IRFconfig.blastocyst){
    if(EntSprite.IsEventTriggered ( "Jump" )){
      spawnDanger(ent)
    }
    //Daddy & triachnide
  }else if ((ent.Type == 101) && IRFconfig.Daddy){
    if((EntSprite.IsPlaying("StompArm") || EntSprite.IsPlaying("StompLeg"))){
      if(EntSprite.GetFrame() == 1){
        spawnDanger(ent)
      }
    }
    else if(BetterMonsters == undefined){
      if((EntSprite.IsPlaying("Down"))){
        if(EntSprite.GetFrame() == 1){
          spawnDanger(ent)
        }
      }
    }
    //BetterMonster compatibility
    else if(BetterMonsters !== undefined){
      if(EntSprite.IsPlaying("Up")){
        if(EntSprite.IsEventTriggered ( "Jump" )){
          spawnDanger(ent)
        }
      }
    }
    //Fattsack
  }else if ((ent.Type == 209) && (EntSprite.IsPlaying("Jump"))){
    if(IRFconfig.FatSack == true){
      if(EntSprite.GetFrame() == 7){
        spawnDanger(ent, 0.03)
      }
    }

    //Mom's hand
  }else if ((ent.Type == 213|| ent.Type == 287) && IRFconfig.MomHand){
    //what a long condition.. To know if the hand is above isaac... took me 2 hours
    if((!ent.IsVulnerableEnemy() && !EntSprite.IsPlaying("JumpUp")) && ( ( Isaac.GetPlayer().Position.X - ent.Position.X >= -2 && Isaac.GetPlayer().Position.X - ent.Position.X <= 2) && (Isaac.GetPlayer().Position.Y - ent.Position.Y >= -2 && Isaac.GetPlayer().Position.Y - ent.Position.Y <= 2) ) )
      spawnDanger(ent)
    if(ent.IsVulnerableEnemy())
      remove(data)

    //Mega fatty and 2 and sister
  }else if ((ent.Type == 264||ent.Type == 265||ent.Type == 410) && (EntSprite.IsPlaying("Jump") || EntSprite.IsPlaying("Jumping")) && IRFconfig.MegaFatty){
    if(EntSprite.IsEventTriggered ( "Jump" )){
      spawnDanger(ent)
    }
    //Adult leach
  }else if ((ent.Type == 854) && (EntSprite.IsPlaying("ChargeDown")) && IRFconfig.ALeach){
    if(EntSprite.GetFrame() == 1){
      spawnDanger(ent)
    }
    //Beelzeblub
  }else if ((ent.Type == 901) && (EntSprite.IsPlaying("Attack04")) && IRFconfig.Beelzeblub){
    if(EntSprite.IsEventTriggered ( "Jump" )){
      spawnDanger(ent)
    }
    //Singe //!à voir
  }else if ((ent.Type == 915) && EntSprite.IsPlaying("SuperBlastLand") && IRFconfig.Singe){
    if(EntSprite.GetFrame() == 1){
      spawnDanger(ent)
    }
    //Adversary
  }else if ((ent.Type == 268) && EntSprite.IsPlaying("FlyUp") && IRFconfig.Adversary){
    if(EntSprite.IsEventTriggered ( "Fly" )){
      spawnDanger(ent, 0.03)
    }
    //MegaSatan
  }else if (ent.Type == 274 && IRFconfig.MegaSatan){
    if(EntSprite.IsPlaying("SmashHand1")){
      if(EntSprite.GetFrame() == 1)
        spawnDanger(ent)
    }
    if(EntSprite.IsPlaying("SmashHand1")){
      if(EntSprite.IsEventTriggered ( "Smash" ))
        remove(data)
    }
    //Ultra Greed
  }else if ((ent.Type == 406) && EntSprite.IsPlaying("JumpUp") && IRFconfig.UltraGreed){
    if(EntSprite.IsEventTriggered ( "Jump" )){
      spawnDanger(ent, 0.04)
    }
    //GreedCoin
  }else if ((ent.Type == 293) && (EntSprite.IsPlaying("AppearKey")||EntSprite.IsPlaying("AppearBomb")||EntSprite.IsPlaying("AppearHeart")||EntSprite.IsPlaying("AppearNeutral")) && IRFconfig.GreedCoin){
    if(EntSprite.GetFrame() == 1)
      spawnDanger(ent, 0.015)
    if(EntSprite.GetFrame() == 12){
      remove(data)
    }
  }
  //Mother
  else if (ent.Type == 912 && IRFconfig.Mother){
    //printConsole(`${EntSprite.GetAnimation()}`)
    if(EntSprite.IsPlaying("JumpDown")){
      if(EntSprite.GetFrame() == 1)
        spawnDanger(ent, 0.015)
    }
    if(EntSprite.IsPlaying("JumpDown")){
      if(EntSprite.IsEventTriggered ( "Shoot" ))
        remove(data)
    }
  }

}
