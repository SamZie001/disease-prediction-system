import React from 'react'

const Report = ({result}) => {
  const condition = result[0]

  return (
    <div className='Report'>
      <p>The system has determined that your current condition is <span>{condition && condition.replace(/_/g, ' ')}</span> based on the symptoms you chose.</p>
      <p>You can visit <a href={`https://www.nhsinform.scot/search?q=${condition.replace(/_/g, '+')}&locpt=&ds=&tab=inform`} target="_blank" rel="noreferrer">here</a> to get information about your condition</p>
    </div>
  )
}

export default Report