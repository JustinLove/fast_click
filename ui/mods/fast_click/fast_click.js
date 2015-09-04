(function() {
  model.contextualActionDown = function(mdevent) {
    if (model.showTimeControls()) return false
    if (model.celestialControlActive()) return false

    var holodeck = mdevent.holodeck
    var append = model.shouldAppendContext(mdevent)

    holodeck.unitGo(mdevent.offsetX, mdevent.offsetY, append)
      .then(model.playCommandSound(mdevent, null))

    model.mode('default');

    return true;
  }

  model.commandModeDown = function(mdevent, command) {
    api.camera.maybeSetFocusPlanet()

    var holodeck = mdevent.holodeck
    var append = model.shouldAppendCommand(mdevent)

    holodeck.unitCommand(command, mdevent.offsetX, mdevent.offsetY, append)
      .then(model.playCommandSound(mdevent, command));

    model.watchForEnd(mdevent,
                      model.shouldExitModeCommand,
                      model.cmdQueueCount,
                      model.endCommandMode)
    return true
  }
})()
