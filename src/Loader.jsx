import React from 'react'
import { asyncComponent } from './util';

const BarLoader = asyncComponent(() => import("react-spinners").then(mod => mod.BarLoader));

export default function Loader(props) {
  return (
      <div className="loader">
        <BarLoader width={100} widthUnit={"%"} css="ciao"/>
      </div>
  )
}
