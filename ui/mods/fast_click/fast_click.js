(function() {
  lgir.contextualActionDown = function(mdevent) {
    if (model.showTimeControls()) return false
    if (model.celestialControlActive()) return false

    var holodeck = mdevent.holodeck
    var append = lgir.shouldAppendContext(mdevent)

    holodeck.unitGo(mdevent.offsetX, mdevent.offsetY, append)
      .then(lgir.playCommandSound(mdevent, null))

    model.mode('default');

    return true;
  }

  lgir.commandModeDown = function(mdevent, command) {
    api.camera.maybeSetFocusPlanet()

    var holodeck = mdevent.holodeck
    var append = lgir.shouldAppendCommand(mdevent)

    holodeck.unitCommand(command, mdevent.offsetX, mdevent.offsetY, append)
      .then(lgir.playCommandSound(mdevent, command));

    lgir.watchForEnd(mdevent,
                      lgir.shouldExitModeCommand,
                      model.cmdQueueCount,
                      model.endCommandMode)
    return true
  }
})()
