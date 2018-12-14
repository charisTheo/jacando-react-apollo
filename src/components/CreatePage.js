import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql} from 'react-apollo'
import Modal from 'react-modal'
import modalStyle from '../constants/modalStyle'
import gql from 'graphql-tag'

class CreatePage extends React.Component {

  state = {
    name: '',
    surname: '',
    position: '',
    dateOfBirth: '',
    imageUrl: '',
  }

  render() {
    return (
      <Modal
        isOpen
        contentLabel='Create Employee'
        style={modalStyle}
        onRequestClose={this.props.history.goBack}
      >
        <div className='pa4 flex justify-center bg-white'>
          <div style={{maxWidth: 400}} className=''>
            {this.state.imageUrl &&
              <img
                src={this.state.imageUrl}
                alt=''
                className='w-100 mv3'
              />}
            <input
              className='w-100 pa3 mv2'
              value={this.state.imageUrl}
              placeholder='Employee image url'
              onChange={e => this.setState({imageUrl: e.target.value})}
              autoFocus
            />
            <input
              className='w-100 pa3 mv2'
              value={this.state.name}
              placeholder='Employee name'
              onChange={e => this.setState({name: e.target.value})}
              autoFocus
            />
            <input
              className='w-100 pa3 mv2'
              value={this.state.surname}
              placeholder='Employee surname'
              onChange={e => this.setState({surname: e.target.value})}
            />
            <input
              className='w-100 pa3 mv2'
              value={this.state.position}
              placeholder='Employee position'
              onChange={e => this.setState({position: e.target.value})}
            />
            <input
              className='w-100 pa3 mv2'
              value={this.state.dateOfBirth}
              placeholder='Employee date of birth'
              type='date'
              onChange={e => this.setState({dateOfBirth: e.target.value})}
            />
            {this.state.surname &&
              this.state.name &&
              this.state.position &&
              this.state.dateOfBirth &&
              <button
                className='pa3 bg-black-10 bn dim ttu pointer'
                onClick={this.handleAddNew}
              >
                Add new Employee
              </button>}
          </div>
        </div>
      </Modal>
    )
  }

  handleAddNew = async () => {
    const {name, surname, position, dateOfBirth} = this.state;
    let {imageUrl} = this.state;
    if (!imageUrl) imageUrl = 'https://cdn1.iconfinder.com/data/icons/IconsLandVistaPeopleIconsDemo/256/Customer_Male_Light.png';
    await this.props.createEmployeeMutation({variables: {name, surname, position, dateOfBirth, imageUrl}})
    this.props.history.replace('/')
  }
  
}

const CREATE_EMPLOYEE_MUTATION = gql`
  mutation CreateEmployeeMutation($surname: String!, $name: String!, $position: String!, $dateOfBirth: String!, $imageUrl: String!) {
    createEmployee(name: $name, surname: $surname, position: $position, dateOfBirth: $dateOfBirth, imageUrl: $imageUrl) {
      id
      surname
      name
      position
      dateOfBirth
      imageUrl
    }
  }
`

const CreatePageWithMutation = graphql(CREATE_EMPLOYEE_MUTATION, {name: 'createEmployeeMutation'})(CreatePage)
export default withRouter(CreatePageWithMutation)
