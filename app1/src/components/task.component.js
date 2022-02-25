const Task = (props) => {
  const { id, title, description, status, changeStatus } = props

  const backgroundColors = {
    OPEN: 'LightGray',
    IN_PROGRESS: 'gold',
    DONE: 'MediumSeaGreen',
  }

  const fontColors = {
    OPEN: 'black',
    IN_PROGRESS: 'black',
    DONE: 'white',
  }

  const getButtonTitle = () => {
    if (status === 'OPEN') {
      return 'In Progress'
    } else if (status === 'IN_PROGRESS') {
      return 'Done'
    }
  }

  const onButtonClick = () => {
    if (status === 'OPEN') {
      changeStatus(id, 'IN_PROGRESS')
    } else if (status === 'IN_PROGRESS') {
      changeStatus(id, 'DONE')
    }
  }

  return (
    <div
      className="card"
      style={{
        backgroundColor: backgroundColors[status],
        color: fontColors[status],
        width: '100%',
        display: 'inline-block',
        margin: '10px',
        height: '150px',
      }}
    >
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        {status !== 'DONE' && (
          <button onClick={onButtonClick} className="btn btn-success">
            {getButtonTitle()}
          </button>
        )}
      </div>
    </div>
  )
}

export default Task
