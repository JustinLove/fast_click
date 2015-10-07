(function() {
  var LeftButton = 0
  var MiddleButton = 1
  var RightButton = 2

  var contextualActionDownWithArea = lgir.contextualActionDown
  lgir.contextualActionDown = function(mdevent) {
    if (model.showTimeControls()) return false
    if (model.celestialControlActive()) return false

    if (mdevent.altKey) {
      return contextualActionDownWithArea(mdevent)
    }

    var holodeck = mdevent.holodeck
    var append = lgir.shouldAppendContext(mdevent)

    holodeck.unitGo(mdevent.offsetX, mdevent.offsetY, append)
      .then(lgir.playCommandSound(mdevent, null))

    model.mode('default');

    return true;
  }

  var commandModeDownWithArea = lgir.commandModeDown
  lgir.commandModeDown = function(mdevent, command) {
    if (mdevent.altKey || commandKeyUpExpected) {
      if (command == 'move') {
        return contextualActionDownWithArea(mdevent)
      } else {
        return commandModeDownWithArea(mdevent, command)
      }
    }

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

  var commandKeyUpExpected = false

  var fastClickCommandKey = function(command, i) {
    return function(kdevent) {
      model.setCommandIndex(i)
      commandKeyUpExpected = kdevent.which
    }
  }

  for (var i = 0; i < model.commands().length; ++i) {
    var command = model.commands()[i];
    action_sets.gameplay['command_mode_' + command] = 
      fastClickCommandKey(command, i)
  }

  $(document).keyup(function(kuevent) {
    if (kuevent.which == commandKeyUpExpected) {
      commandKeyUpExpected = false
    }
  })
})()
