/**
 * Created by pillars on 2016/11/1.
 */
import {
  Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

declare var tinymce: any;

@Component({
  selector: 'simple-tiny',
  template: `<textarea id="{{elementId}}"></textarea>`
})
export class SimpleTinyComponent implements AfterViewInit, OnDestroy {
  @Input() elementId: String;
  // @Output() onEditorKeyup = new EventEmitter<any>();

  editor;


  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: "image",
      menubar: "insert",
     // toolbar: "image",
      image_list: [
        {title: 'My image 1', value: 'file://Users/pillars/123.jpg'},
        {title: 'My image 2', value: 'http://www.wallcoo.com/animal/v195_Lively_Dogs/wallpapers/1280x800/Lively_Dogs_wallpaper_MIX88041_wallcoo.com.jpg'}
      ],









      skin_url: 'assets/skins/lightgray',

      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          // this.onEditorKeyup.emit(content);
        });
      }


      // theme: 'modern',
      // plugins: [
      //   'advlist autolink lists link image charmap print preview hr anchor pagebreak',
      //   'searchreplace wordcount visualblocks visualchars code fullscreen',
      //   'insertdatetime media nonbreaking save table contextmenu directionality',
      //   'emoticons template paste textcolor colorpicker textpattern imagetools codesample'
      // ],
      // toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      // toolbar2: 'print preview media | forecolor backcolor emoticons | codesample',
      // image_advtab: true,
      // templates: [
      //   { title: 'Test template 1', content: 'Test 1' },
      //   { title: 'Test template 2', content: 'Test 2' }
      // ],
      // content_css: [
      //   '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
      //   '//www.tinymce.com/css/codepen.min.css'
      // ]
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
