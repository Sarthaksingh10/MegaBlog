import propTypes from 'prop-types'

function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
  
}

Container.propTypes={
    children:propTypes.any
}

export default Container
