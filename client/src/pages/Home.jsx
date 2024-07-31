import React from 'react'

import Header from '../component/Header'
import Events from '../component/Events'



function Home() {
  return (
    <div>
      <section>
        <Header/>
      </section>
      
      <section>
        <Events/>
      </section>
     
    </div>
  )
}

export default Home