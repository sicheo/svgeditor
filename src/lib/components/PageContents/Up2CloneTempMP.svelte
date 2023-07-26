<script lang="ts">


import { onMount} from "svelte";
import { _ } from 'svelte-i18n'
import PdfTemplate from 'pdf-template-maker'




   export let color:any
   export let filelist = [
       {name:"$_Document10_footer",content:""},
       {name:"$_Document11_footer",content:""},
       {name:"$_Document12_header",content:""},
       {name:"$_Document14_content",content:""},
       {name:"$_Document13_header",content:""},
       {name:"$_Document15_content",content:""},
       {name:"$_Document16_content",content:""},
       {name:"$_Document17_content",content:""},
       {name:"$_Document2_footer",content:"Curabitur lacinia mi non lorem malesuada vulputate."},
       {name:"$_Document6_content",content:""},
       {name:"$_Document1_header",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. "},
       {name:"$_Document4_content",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac ex facilisis metus scelerisque convallis. Fusce enim mauris, fringilla tempor vehicula nec, feugiat a ligula. Ut molestie nibh vel metus suscipit bibendum. Aenean laoreet lobortis magna, id convallis nisi ullamcorper sed. Nullam nec fermentum odio. Phasellus ultricies urna in diam tempus, vel egestas nulla tincidunt. Nam viverra aliquet odio at tempor. Quisque sed vestibulum ante, eu convallis lacus.\r\n\r\nCras et mollis est, eget dapibus erat. Nullam magna augue, convallis quis mattis ut, scelerisque sit amet lectus. Etiam rhoncus justo in ante ultricies commodo. Aliquam id scelerisque est, gravida dapibus velit. Suspendisse non sagittis ante, sed facilisis risus. Duis accumsan tincidunt fringilla. Vivamus nibh mauris, tincidunt et nisi vitae, facilisis venenatis nulla. Sed congue nunc dui. Sed tristique sit amet eros in auctor. Sed ac sapien laoreet, auctor est eu, rutrum turpis. Proin feugiat augue pellentesque purus malesuada, in congue nibh suscipit. In malesuada odio at nisi sodales consectetur. Mauris dapibus quam sed nisi pharetra finibus. Vivamus nec mauris bibendum, fringilla elit eu, mollis est. Integer eget lorem auctor, rhoncus mauris ut, vulputate magna. Ut vehicula varius nisl, vel vestibulum velit pharetra et.\r\n\r\nNullam consequat sit amet lectus a efficitur. Ut tortor nunc, convallis a nisi nec, fermentum auctor lectus. Phasellus scelerisque dignissim fermentum. Etiam sed tortor enim. Donec et sapien vel quam sodales aliquet eu vitae odio. Vivamus eu risus blandit, imperdiet neque ac, fringilla magna. Etiam rhoncus metus non luctus volutpat. Cras et viverra quam, vel suscipit eros. In elementum semper ullamcorper. Etiam ultrices consectetur diam, id tempor neque. Suspendisse sed urna vitae nibh malesuada bibendum at volutpat erat. Donec nec nisl ut elit pretium tincidunt. Curabitur feugiat scelerisque mi, id egestas elit rutrum vitae. Sed et sollicitudin magna. Aenean tristique vitae ipsum eu ultrices. Morbi nec semper lectus.\r\n\r\nDuis interdum mi in finibus venenatis. Vivamus consectetur porttitor dapibus. Cras suscipit odio vehicula neque sodales pretium. Donec luctus nec diam vulputate accumsan. Integer ultricies metus eu ipsum lacinia vehicula. Fusce pharetra blandit vestibulum. Maecenas sagittis augue purus, ut maximus felis pellentesque sed.\r\n\r\nDuis purus orci, hendrerit at malesuada in, iaculis sodales tellus. Praesent lectus orci, commodo ac consequat ut, accumsan id lacus. In sollicitudin efficitur metus, a dignissim lectus congue eget. Phasellus laoreet est at arcu mattis condimentum. In consequat condimentum suscipit. Mauris malesuada commodo nunc et volutpat. Integer et sodales lectus. Aenean nec velit nec libero auctor malesuada. Aenean sollicitudin ipsum at ipsum aliquet, id maximus tortor semper. Nulla quis dui dolor. Maecenas ac convallis mauris. Cras ullamcorper rutrum odio, vitae sagittis magna condimentum vel. Ut mattis sed turpis tristique mollis. Aliquam iaculis odio ac dolor fermentum consectetur. Curabitur lacinia mi non lorem malesuada vulputate."},
       {name:"$_Document9_content",content:""},
       {name:"$_Document5_content",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac ex facilisis metus scelerisque convallis. Fusce enim mauris, fringilla tempor vehicula nec, feugiat a ligula. Ut molestie nibh vel metus suscipit bibendum. Aenean laoreet lobortis magna, id convallis nisi ullamcorper sed. Nullam nec fermentum odio. Phasellus ultricies urna in diam tempus, vel egestas nulla tincidunt. Nam viverra aliquet odio at tempor. Quisque sed vestibulum ante, eu convallis lacus.\r\n\r\nCras et mollis est, eget dapibus erat. Nullam magna augue, convallis quis mattis ut, scelerisque sit amet lectus. Etiam rhoncus justo in ante ultricies commodo. Aliquam id scelerisque est, gravida dapibus velit. Suspendisse non sagittis ante, sed facilisis risus. Duis accumsan tincidunt fringilla. Vivamus nibh mauris, tincidunt et nisi vitae, facilisis venenatis nulla. Sed congue nunc dui. Sed tristique sit amet eros in auctor. Sed ac sapien laoreet, auctor est eu, rutrum turpis. Proin feugiat augue pellentesque purus malesuada, in congue nibh suscipit. In malesuada odio at nisi sodales consectetur. Mauris dapibus quam sed nisi pharetra finibus. Vivamus nec mauris bibendum, fringilla elit eu, mollis est. Integer eget lorem auctor, rhoncus mauris ut, vulputate magna. Ut vehicula varius nisl, vel vestibulum velit pharetra et.\r\n\r\nNullam consequat sit amet lectus a efficitur. Ut tortor nunc, convallis a nisi nec, fermentum auctor lectus. Phasellus scelerisque dignissim fermentum. Etiam sed tortor enim. Donec et sapien vel quam sodales aliquet eu vitae odio. Vivamus eu risus blandit, imperdiet neque ac, fringilla magna. Etiam rhoncus metus non luctus volutpat. Cras et viverra quam, vel suscipit eros. In elementum semper ullamcorper. Etiam ultrices consectetur diam, id tempor neque. Suspendisse sed urna vitae nibh malesuada bibendum at volutpat erat. Donec nec nisl ut elit pretium tincidunt. Curabitur feugiat scelerisque mi, id egestas elit rutrum vitae. Sed et sollicitudin magna. Aenean tristique vitae ipsum eu ultrices. Morbi nec semper lectus.\r\n\r\nDuis interdum mi in finibus venenatis. Vivamus consectetur porttitor dapibus. Cras suscipit odio vehicula neque sodales pretium. Donec luctus nec diam vulputate accumsan. Integer ultricies metus eu ipsum lacinia vehicula. Fusce pharetra blandit vestibulum. Maecenas sagittis augue purus, ut maximus felis pellentesque sed.\r\n\r\nDuis purus orci, hendrerit at malesuada in, iaculis sodales tellus. Praesent lectus orci, commodo ac consequat ut, accumsan id lacus. In sollicitudin efficitur metus, a dignissim lectus congue eget. Phasellus laoreet est at arcu mattis condimentum. In consequat condimentum suscipit. Mauris malesuada commodo nunc et volutpat. Integer et sodales lectus. Aenean nec velit nec libero auctor malesuada. Aenean sollicitudin ipsum at ipsum aliquet, id maximus tortor semper. Nulla quis dui dolor. Maecenas ac convallis mauris. Cras ullamcorper rutrum odio, vitae sagittis magna condimentum vel. Ut mattis sed turpis tristique mollis. Aliquam iaculis odio ac dolor fermentum consectetur. Curabitur lacinia mi non lorem malesuada vulputate."},
       {name:"$_Document3_content",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac ex facilisis metus scelerisque convallis. Fusce enim mauris, fringilla tempor vehicula nec, feugiat a ligula. Ut molestie nibh vel metus suscipit bibendum. Aenean laoreet lobortis magna, id convallis nisi ullamcorper sed. Nullam nec fermentum odio. Phasellus ultricies urna in diam tempus, vel egestas nulla tincidunt. Nam viverra aliquet odio at tempor. Quisque sed vestibulum ante, eu convallis lacus.\r\n\r\nCras et mollis est, eget dapibus erat. Nullam magna augue, convallis quis mattis ut, scelerisque sit amet lectus. Etiam rhoncus justo in ante ultricies commodo. Aliquam id scelerisque est, gravida dapibus velit. Suspendisse non sagittis ante, sed facilisis risus. Duis accumsan tincidunt fringilla. Vivamus nibh mauris, tincidunt et nisi vitae, facilisis venenatis nulla. Sed congue nunc dui. Sed tristique sit amet eros in auctor. Sed ac sapien laoreet, auctor est eu, rutrum turpis. Proin feugiat augue pellentesque purus malesuada, in congue nibh suscipit. In malesuada odio at nisi sodales consectetur. Mauris dapibus quam sed nisi pharetra finibus. Vivamus nec mauris bibendum, fringilla elit eu, mollis est. Integer eget lorem auctor, rhoncus mauris ut, vulputate magna. Ut vehicula varius nisl, vel vestibulum velit pharetra et.\r\n\r\nNullam consequat sit amet lectus a efficitur. Ut tortor nunc, convallis a nisi nec, fermentum auctor lectus. Phasellus scelerisque dignissim fermentum. Etiam sed tortor enim. Donec et sapien vel quam sodales aliquet eu vitae odio. Vivamus eu risus blandit, imperdiet neque ac, fringilla magna. Etiam rhoncus metus non luctus volutpat. Cras et viverra quam, vel suscipit eros. In elementum semper ullamcorper. Etiam ultrices consectetur diam, id tempor neque. Suspendisse sed urna vitae nibh malesuada bibendum at volutpat erat. Donec nec nisl ut elit pretium tincidunt. Curabitur feugiat scelerisque mi, id egestas elit rutrum vitae. Sed et sollicitudin magna. Aenean tristique vitae ipsum eu ultrices. Morbi nec semper lectus.\r\n\r\nDuis interdum mi in finibus venenatis. Vivamus consectetur porttitor dapibus. Cras suscipit odio vehicula neque sodales pretium. Donec luctus nec diam vulputate accumsan. Integer ultricies metus eu ipsum lacinia vehicula. Fusce pharetra blandit vestibulum. Maecenas sagittis augue purus, ut maximus felis pellentesque sed.\r\n\r\nDuis purus orci, hendrerit at malesuada in, iaculis sodales tellus. Praesent lectus orci, commodo ac consequat ut, accumsan id lacus. In sollicitudin efficitur metus, a dignissim lectus congue eget. Phasellus laoreet est at arcu mattis condimentum. In consequat condimentum suscipit. Mauris malesuada commodo nunc et volutpat. Integer et sodales lectus. Aenean nec velit nec libero auctor malesuada. Aenean sollicitudin ipsum at ipsum aliquet, id maximus tortor semper. Nulla quis dui dolor. Maecenas ac convallis mauris. Cras ullamcorper rutrum odio, vitae sagittis magna condimentum vel. Ut mattis sed turpis tristique mollis. Aliquam iaculis odio ac dolor fermentum consectetur. Curabitur lacinia mi non lorem malesuada vulputate."},
       {name:"$_Document7_content",content:""},
       {name:"$_Document8_content",content:""}
]






  

   onMount(async ()=>{
       console.log("PDF TEMPLATE MOUNTED")
    });


   
  

</script>
    <div class= "class-panel-row" id="id-data-conf-table-div">
       <PdfTemplate fileListpassed={filelist} debug=true/>
    </div>

   
<style>
.class-panel-row {
  display: block;
  justify-content:left;
  font-family: Arial, Helvetica, sans-serif;
  font-size: small;
  font-weight: bold;
}


</style>