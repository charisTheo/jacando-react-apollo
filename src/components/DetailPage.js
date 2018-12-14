import React from 'react';
import { graphql, compose } from 'react-apollo';
import Modal from 'react-modal';
import modalStyle from '../constants/modalStyle';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import ContentEditable from "./ContentEditable";
import Button from './SaveButton';

const detailModalStyle = {
  overlay: modalStyle.overlay,
  content: {
    ...modalStyle.content,
    height: 761,
  },
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Employee: {...this.props.employeeQuery.Employee},
      edited: false
    }
  }

  render() {
    if (this.props.employeeQuery.loading) {
      return (
        <div className='flex w-100 h-100 items-center justify-center pt7'>
          <div>
            Loading...
          </div>
        </div>
      )
    }

    const {Employee} = this.state;

    return (
      <Modal
        isOpen
        contentLabel='Create Employee'
        style={detailModalStyle}
        onRequestClose={this.props.history.goBack}
      >
        <div
          className='close right-0 top-0 pointer'
          onClick={this.props.history.goBack}
        >
          <img src={require('../assets/close.svg')} alt='' />
        </div>
        <div
          className='delete ttu white pointer fw6 absolute left-0 top-0 br2'
          onClick={this.handleDelete}
        >
          Delete
        </div>
        <div
          className='bg-white detail flex flex-column no-underline br2 h-100'
        >
          <div
            className='image'
            style={{
              backgroundImage: `url(${Employee.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              marginTop: '25px'
            }}
          />
          <ContentEditable onUpdate={(html) => this.handleNameUpdate(html)} className='items-center black-80 fw3 name' html={Employee.name} />
          <ContentEditable onUpdate={(html) => this.handleSurnameUpdate(html)} className='items-center black-80 fw3 surname' html={Employee.surname} />
          <ContentEditable onUpdate={(html) => this.handlePositionUpdate(html)} className='flex items-center black-80 fw3 position' html={Employee.position} />
          <ContentEditable onUpdate={(html) => this.handleDateOfBirthUpdate(html)} className='flex items-center black-80 fw3 dob' html={Employee.dateOfBirth} />
            
          {this.state.edited &&
            <Button clickHandler={this.onSave} content='SAVE'/>
          }
        </div>
      </Modal>
    )
  }

  onSave = async (e) => {
    if (this.state.edited) {
      e.target.innerHTML = 'SAVING...';
      await this.handleUpdate();
      e.target.innerHTML = 'SAVED!';
      setTimeout(function(){
        this.setState({
          edited: false
        });
      }, 1000);
    }
  }

  handleNameUpdate = (newName) => {
    this.setState({Employee: {
      ...this.state.Employee,
      name: newName,
      edited: true
    }}, () => {
      this.handleUpdate();
    });
  }
  handleSurnameUpdate = (newSurname) => {
    this.setState({Employee: {
      ...this.state.Employee,
      surname: newSurname,
      edited: true
    }}, () => {
      this.handleUpdate();
    });
  }
  handlePositionUpdate = (newPosition) => {
    this.setState({Employee: {
      ...this.state.Employee,
      position: newPosition,
      edited: true
    }}, () => {
      this.handleUpdate();
    });
  }
  handleDateOfBirthUpdate = (newDateOfBirth) => {
    this.setState({Employee: {
      ...this.state.Employee,
      dateOfBirth: newDateOfBirth,
      edited: true
    }}, () => {
      this.handleUpdate();
    });
  }

  handleUpdate = async () => {
    await this.props.updateEmployeeMutation({variables: this.state.Employee});
  }
  handleDelete = async () => {
    await this.props.deleteEmployeeMutation({variables: {id: this.props.employeeQuery.Employee.id}});
    this.props.history.replace('/');
  }

  
}

const DELETE_EMPLOYEE_MUTATION = gql`
  mutation DeleteEmployeeMutation($id: ID!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`

const UPDATE_EMPLOYEE_MUTATION = gql`
  mutation UpdateEmployeeMutation($id: ID!, $surname: String!, $name: String!, $position: String!, $dateOfBirth: String!, $imageUrl: String!) {
    updateEmployee(id: $id, name: $name, surname: $surname, position: $position, dateOfBirth: $dateOfBirth, imageUrl: $imageUrl) {
      id
      surname
      name
      position
      dateOfBirth
      imageUrl
    }
  }
`

const EMPLOYEE_QUERY = gql`
  query employeeQuery($id: ID!) {
    Employee(id: $id) {
      id
      name
      surname
      dateOfBirth
      position
      imageUrl
    }
  }
`

const DetailPageWithGraphQL = compose(
  graphql(EMPLOYEE_QUERY, {
    name: 'employeeQuery',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: ({match}) => ({
      variables: {
        id: match.params.id,
      },
    }),
  }),
  graphql(DELETE_EMPLOYEE_MUTATION, {
    name: 'deleteEmployeeMutation'
  }),
  graphql(UPDATE_EMPLOYEE_MUTATION, {
    name: 'updateEmployeeMutation'
  })
)(DetailPage)



const DetailPageWithDelete = graphql(DELETE_EMPLOYEE_MUTATION)(DetailPageWithGraphQL);

export default withRouter(DetailPageWithDelete);
