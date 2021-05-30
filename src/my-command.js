import sketch from 'sketch'
import UI from "sketch/ui";

// documentation: https://developer.sketchapp.com/reference/api/

export default function() {

  // console.log('This is an example Sketch script.')

  var document = sketch.getSelectedDocument()
  var pages = document.pages
  const desingTokensPages = pages.filter(page => page.selected === true)
  const desingTokensPage = desingTokensPages[0]
  if (!desingTokensPage) {
    UI.alert("请选择目标页面", "未选中页面")
    return
  }

  var selectPage = desingTokensPage

  const artboards = selectPage.layers.filter(layer => layer.selected === true)

  if (artboards.length == 0) {
    UI.alert("请选中画板", "未选中画板")
    return;
  }

  var dataSource = []
  let jsonKey = 'jsonKey'
  let layerKey = 'layerKey'
  let nameKey = 'nameKey'
  for (let index in artboards) {
    let artboard = artboards[index]
    var jsonContent = {
      "canvas_w": artboard.frame.width,
      "canvas_h": artboard.frame.height,
      "bg_color": artboard.background.color
    }
    var poster_shapes = []
    var poster_image = []
    var poster_text = []
    var poster_other = []
    var export_layers = []


    artboard.layers.forEach(function (layer, i) {


        var item = {}
        Object.assign(item,{},JSON.parse(JSON.stringify(layer)));
        item["level"] = i
        item["type_name"] = layer.type
        item["transform_rotation"] = layer.transform.rotation
        //delete layer info
        item["layers"] = []

        // var item = {
        //   "frame": layer.frame,
        //   "name": layer.name,
        //   "level": i,
        //   "type_name": layer.type,
        //   "locked":layer.locked,
        //   "transform_rotation":layer.transform.rotation,
        //   "style": layer.style
        // }
        if (layer.type == 'Text') {
          item["layer_type"] = 1
          item["text"] = layer.text
          poster_text.push(item)
        }else if (layer.type == 'Image' || layer.type == 'Group') {
          item["layer_type"] = 2
          item["type_name"] = 'Image'
          poster_image.push(item)
        }else if (layer.type == 'ShapePath') {
          item["svg"] = layer.getSVGPath()
          item["layer_type"] = 3
          poster_shapes.push(item)
        }else {
          item["layer_type"] = 4
          poster_other.push(item)
        }
        export_layers.push(layer)

    })
    jsonContent["layer_shapes"] = poster_shapes
    jsonContent["layer_images"] = poster_image
    jsonContent["layer_texts"] = poster_text
    jsonContent["layer_other"] = poster_other

    let jsonStr = JSON.stringify(jsonContent)
    let itemData = {
      jsonKey: jsonStr,
      layerKey: export_layers,
      nameKey: artboard.name
    }
    dataSource.push(itemData)
  }

  const open = NSOpenPanel.openPanel();
  open.canChooseFiles = false
  open.canChooseDirectories = true
  open.canCreateDirectories = true
  if (open.runModal()) {
    var path = open.URL().path();
    let fileManager = NSFileManager.defaultManager()
    for(let index in dataSource) {
      let itemData = dataSource[index]
      let jsonStr = itemData[jsonKey]
      let layerArr = itemData[layerKey]
      let name = itemData[nameKey]
      let dirPath = path + "/" + name
      let b = fileManager.fileExistsAtPath_isDirectory(dirPath, null)
      if (!b) {
        fileManager.createDirectoryAtPath_withIntermediateDirectories_attributes_error(dirPath, true, null, null)
      }
      let configPath = dirPath + '/config.json'
      let file = NSString.stringWithString(jsonStr)
      file.writeToFile_atomically_encoding_error(configPath, true, NSUTF8StringEncoding, null)

      var imagePath = dirPath
       const exportOptions = {
            formats: 'png',
            scales: '3x',
            output: imagePath,
            overwriting: true,
            trimmed: false
        }
      for (let index in layerArr) {
          var export_item = layerArr[index]
          if (export_item.name != 'cut_position' && export_item.type != "Text") {
              // if(export_item.type == 'Image') {
              //   let path = imagePath + '/' + export_item.name + '.png'
              //   let imageData = export_item.image.nsdata
              //   imageData.writeToFile_atomically(path, true)
              // }else {
                export_item.name = export_item.name
                sketch.export(export_item, exportOptions)
              // }
          }
      }
    }
    UI.alert("保存成功", path)
  }



  // console.log(JSON.stringify(jsonContent))
  // sketch.UI.message(JSON.stringify(jsonStr))
}
