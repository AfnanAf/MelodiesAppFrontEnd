// import Accordion from 'react-bootstrap/Accordion';
// import { Card } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';
// import SongsPlaylist from './SongsPlaylist'
// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-react-navigations';
// export default class Playlist extends Component {
//   render() {
//     return (
//     //   <div>
//     //     <Accordion>
//     //       <Card className="playlists">
//     //         <Card.Header>
//     //           <Accordion.Toggle as={Button} variant="link" eventKey="0">
//     //             {this.props.playlistName}
//     //           </Accordion.Toggle>
//     //         </Card.Header>
//     //         <Accordion.Collapse eventKey="0">
//     //           <SongsPlaylist songsPlaylist={this.props.playlistSongs}/>
              
//     //         </Accordion.Collapse>
//     //       </Card>
//     //     </Accordion>
//     //   </div>
    
//    <AccordionComponent expanding={this.expanding.bind(this)} ref={acrdn => this.acrdnInstance = acrdn}>
//     <AccordionItemsDirective>
//       <AccordionItemDirective header='Video' content='<div id="nested_video"></div>'/>
//       <AccordionItemDirective header='Music' content='<div id="nested_music"></div>'/>
//       <AccordionItemDirective header='Images' content='<div id="nested_images"></div>'/>
//     </AccordionItemsDirective>
// </AccordionComponent>);
// }
// nestedExpand(e) {
// if (e.element.querySelectorAll('.e-accordion').length > 0) {
//     return;
// }
// ReactDOM.render(<AccordionComponent>
//     <AccordionItemsDirective>
//       <AccordionItemDirective header='New Track1'/>
//       <AccordionItemDirective header='New Track2'/>
//     </AccordionItemsDirective>
// </AccordionComponent>, document.getElementById("nested_musicNew"));
// }
// expanding(e) {
// if (e.isExpanded && [].indexOf.call(this.acrdnInstance.items, e.item) === 0) {
//     if (e.element.querySelectorAll('.e-accordion').length > 0) {
//         return;
//     }
//     ReactDOM.render(<AccordionComponent>
//     <AccordionItemsDirective>
//       <AccordionItemDirective header='Video Track1'/>
//       <AccordionItemDirective header='Video Track2'/>
//     </AccordionItemsDirective>
// </AccordionComponent>, document.getElementById("nested_video"));
// }
// else if (e.isExpanded && [].indexOf.call(this.acrdnInstance.items, e.item) === 1) {
//     if (e.element.querySelectorAll('.e-accordion').length > 0) {
//         return;
//     }
//     ReactDOM.render(<AccordionComponent expanding={this.nestedExpand}>
//     <AccordionItemsDirective>
//       <AccordionItemDirective header='Music Track1'/>
//       <AccordionItemDirective header='Music Track2'/>
//       <AccordionItemDirective header='Music New' content='<div id="nested_musicNew"></div>'/>
//     </AccordionItemsDirective>
// </AccordionComponent>, document.getElementById("nested_music"));
// }
// else if (e.isExpanded && [].indexOf.call(this.acrdnInstance.items, e.item) === 2) {
//     if (e.element.querySelectorAll('.e-accordion').length > 0) {
//         return;
//     }
//     ReactDOM.render(<AccordionComponent>
//     <AccordionItemsDirective>
//       <AccordionItemDirective header='Track1'/>
//       <AccordionItemDirective header='Track2'/>
//     </AccordionItemsDirective>
// </AccordionComponent>, document.getElementById("nested_images"));
// }
// }
// }
// ReactDOM.render(<ReactApp />, document.getElementById("element"));

  

