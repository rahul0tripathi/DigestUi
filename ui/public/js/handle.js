function getDefaultConfig(){
    var decorator = $(`#global_config_editor_id`).data('ace');
    return decorator.element[0].value
}

$(document).ready(() => {
    $('.modal').modal();
    
})