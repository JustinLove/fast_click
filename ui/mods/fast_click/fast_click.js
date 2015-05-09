(function() {
  model.contextualActionDown = function(mdevent) {
    if (model.showTimeControls()) return false
    if (model.celestialControlActive()) return false

    var holodeck = mdevent.holodeck
    var startx = mdevent.offsetX;
    var starty = mdevent.offsetY;
    var append = model.shouldAppendContext(mdevent)

    holodeck.unitGo(startx, starty, append)
      .then(model.playCommandSound(mdevent, null))
    model.mode('default');

    return true;
  }

  model.commandModeDown = function(mdevent, command, targetable) {
    engine.call('camera.cameraMaybeSetFocusPlanet');
    var holodeck = mdevent.holodeck
    model.watchForEnd(mdevent,
                      model.shouldExitModeCommand,
                      model.cmdQueueCount,
                      model.endCommandMode)
    var append = model.shouldAppendCommand(mdevent)
    var exit = model.shouldExitModeCommand(mdevent)

    if (model.hasWorldHoverTarget() && targetable) {
      api.unit.targetCommand(command, model.worldHoverTarget(), append)
        .then(model.playCommandSound(mdevent, command));
    } else {
      holodeck.unitCommand(command, mdevent.offsetX, mdevent.offsetY, append)
        .then(model.playCommandSound(mdevent, command));
    }

    if (exit)
      model.endCommandMode();

    return true
  }
})()
