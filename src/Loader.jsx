import React from 'react'
import { BarLoader } from 'react-spinners';

export default function Loader(props) {
  return (
      <div className="loader">
        <BarLoader width={100} widthUnit={"%"} css="ciao"/>
      </div>
  )
}
