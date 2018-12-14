import React from 'react'
import { Link } from 'react-router-dom'

export default class Employee extends React.Component {

  render() {
    return (
      <Link
        className='bg-white ma3 box employee flex flex-column no-underline br2'
        to={`/employee/${this.props.employee.id}`}
      >
        <div
          className='image'
          style={{
            backgroundImage: `url(${this.props.employee.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            marginTop: '25px'
          }}
        />
        <div className='flex items-center black-80 fw3 name'>
          {this.props.employee.name} {this.props.employee.surname}
        </div>
      </Link>
    )
  }

}