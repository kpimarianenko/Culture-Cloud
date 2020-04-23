import React, {Component} from 'react';
import '../Styles/BreadCrumbs.css';

class BreadCrumbs extends Component {
    // splitCurrentUrl() {
    //     const path = this.props.curUrl;
    //     if (path.length <= 1) return ['/']
    //     const pathParts = window.location.pathname.split('/');
    //     const urlParts = [];
    //       pathParts.forEach(element => {
    //         urlParts.push(`/${element}`)
    //       });
    //     return urlParts;
    //   }
      
    // getBreadCrumbsTitles(routes) {
    //     const urlParts = this.splitCurrentUrl();
    //     const breadCrumbsTitles = [];
    //     urlParts.forEach(function(element){
    //         const route = Object.values(routes).filter(route => route.path === element)[0];
    //         breadCrumbsTitles.push(route.breadCrumbTitle);
    //     })
    //     console.log(breadCrumbsTitles)
    //     return breadCrumbsTitles;
    // }
    
    render() {
        return ( 
          <div id="bread__crumbs">
          </div>
        );
    }
}

export default BreadCrumbs;
