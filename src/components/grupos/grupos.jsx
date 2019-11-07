import React from 'react'

const grupos = ({name,username, email}) => (
  <article>
    <div>
      <h3>{name}</h3>
      <div>
        {username}
      </div>
      <div>
        {email}
      </div>
      <div className="container">
      
      </div>
    </div>
  </article>
)

export default grupos;