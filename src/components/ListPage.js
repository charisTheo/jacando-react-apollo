import React from 'react'
import { Link } from 'react-router-dom'
import Employee from './Employee'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class ListPage extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.allEmployeesQuery.refetch()
    }
  }

  render() {
    if (this.props.allEmployeesQuery.loading) {
      return (
        <div className='flex w-100 h-100 items-center justify-center pt7'>
          <div>
            Loading...
          </div>
        </div>
      )
    }

    let blurClass = ''
    if (this.props.location.pathname !== '/') {
      blurClass = ' blur'
    }

    return (
      <div className={'w-100 flex justify-center pa6' + blurClass}>
        <div className='w-100 flex flex-wrap' style={{maxWidth: 1150}}>
          <Link
            to='/create'
            className='ma3 box new-employee br2 flex flex-column items-center justify-center ttu fw6 f20 black-30 no-underline'
          >
            <img
              src={require('../assets/plus.svg')}
              alt=''
              className='plus mb3'
            />
            <div>New Employee</div>
          </Link>
          {this.props.allEmployeesQuery.allEmployees && this.props.allEmployeesQuery.allEmployees.map(employee => (
            <Employee
              key={employee.id}
              employee={employee}
              refresh={() => this.props.allEmployeesQuery.refetch()}
            />
          ))}
        </div>
        {this.props.children}
      </div>
    )
  }
}

const ALL_EMPLOYEES_QUERY = gql`
  query AllEmployeesQuery {
    allEmployees(orderBy: createdAt_DESC) {
      id
      name
      surname
      imageUrl
    }
  }
`

const ListPageWithQuery = graphql(ALL_EMPLOYEES_QUERY, {
  name: 'allEmployeesQuery',
  options: {
    fetchPolicy: 'network-only',
  },
})(ListPage)

export default ListPageWithQuery
