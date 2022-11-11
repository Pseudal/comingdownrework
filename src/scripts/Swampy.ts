export function SwampyCompatibility(ent, EntSprite, spawnDanger, data, remove, IRFconfig):void {
  //Splashy
if (ent.Type == 977 && EntSprite.IsPlaying("Изводы_прыжок") && IRFconfig.Splashy){
  if(EntSprite.IsEventTriggered ( "effect" )){
    spawnDanger(ent)
    return
  }
  if(EntSprite.IsPlaying("Изводы_прыжок")){
    if(EntSprite.GetFrame() == 54){
      remove(data)
      return
    }
  }
  //RogHorn
}else if ((ent.Type == 977 && (ent.Variant == 10 )) && IRFconfig.RogHorn){
  if(EntSprite.IsPlaying("NONE_прыжок")){
    if(EntSprite.GetFrame() == 7){
      spawnDanger(ent)
      return
    }
  }
  if(EntSprite.IsPlaying("NONE_прыжок")){
    if(EntSprite.GetFrame() == 27){
      remove(data)
      return
    }
  }
}
}