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
    UI.alert("请选择目标页面", "未选中页面");
    return
  }
  var selectPage = pages[0]
  var artboard = selectPage.layers[0]
  console.log(artboard)
  var jsonContent = {
    "canvas_w": artboard.frame.width,
    "canvas_h": artboard.frame.height,
    "bg_color": artboard.background.color
  }
  var poster_shapes = []
  var poster_image = []
  var poster_text = []
  var export_layers = []
  artboard.layers.forEach(function (layer, i) {
    var item = {
        "frame": layer.frame,
        "name": layer.name,
        "level": i,
        "type_name": layer.type
    }
    if (layer.type == 'Text') {
      item["style"] = layer.style
      item["layer_type"] = 1
      poster_text.push(item)
    }else if (layer.type == 'Image') {
      item["layer_type"] = 2
      poster_image.push(item)
    }else if (layer.type == 'ShapePath') {
      item["svg"] = layer.getSVGPath()
      item["layer_type"] = 3
      poster_shapes.push(item)
    }
    export_layers.push(layer)

  })
  jsonContent["layer_shapes"] = poster_shapes
  jsonContent["layer_images"] = poster_image
  jsonContent["layer_texts"] = poster_text

  let jsonStr = JSON.stringify(jsonContent)
  let defaultFileName = "config.json"
  let contents = jsonStr
  let save = NSSavePanel.savePanel();
  save.setNameFieldStringValue(defaultFileName);
  save.setAllowsOtherFileTypes(false);
  save.setExtensionHidden(false);

  if (save.runModal()) {
    let file = NSString.stringWithString(contents);
    let path = save.URL().path();

    var imagePath = path
    imagePath = imagePath.replace("/"+defaultFileName, "")
     const exportOptions = {
          formats: 'png',
          scales: '2x',
          output: imagePath,
        }
    for (let index in export_layers) {
        var export_item = export_layers[index]
        export_item.name = export_item.name
        sketch.export(export_item, exportOptions)
    }


    file.writeToFile_atomically_encoding_error(path, true, NSUTF8StringEncoding, null);
    UI.alert("保存成功", path);
  }


  // console.log(JSON.stringify(jsonContent))
  // sketch.UI.message(JSON.stringify(jsonStr))
}
