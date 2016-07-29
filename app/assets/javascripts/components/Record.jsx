var Record = React.createClass({
  getInitialState: function() {
    return { edit: false }
  },

  handleDelete: function(e) {
    e.preventDefault();
    $.ajax({
      method: 'DELETE',
      url: "/records/" + this.props.record.id,
      dataType: 'JSON',
      success: function() {
        console.log(this.props);
        this.props.handleDeleteRecord(this.props.record);
      }.bind(this)
    });
  },

  handleToggle: function(e) {
    e.preventDefault();
    this.setState({edit: !this.state.edit});
  },

  recordForm: function() {
    return (
      <tr>
        <td><input className='form-control' type='text' defaultValue={ this.props.record.date } ref='date' /></td>
        <td><input className='form-control' type='text' defaultValue={ this.props.record.title } ref='title' /></td>
        <td><input className='form-control' type='number' defaultValue={ this.props.record.amount } ref='amount' /></td>
        <td>
          <a className='btn btn-default mr10' onClick={ this.handleEdit }>Update</a>
          <a className='btn btn-danger' onClick={ this.handleToggle }>Cancel</a>
        </td>
      </tr>
    )
  },

  recordRow: function() {
    return (
      <tr>
        <td>{ this.props.record.date }</td>
        <td>{ this.props.record.title }</td>
        <td>{ amountFormat(this.props.record.amount) }</td>
        <td>
          <a className='btn btn-default mr10' onClick={ this.handleToggle }>Edit</a>
          <a className='btn btn-danger' onClick={ this.handleDelete }>Delete</a>
        </td>
      </tr>
    );
  },

  handleEdit: function(e) {
    e.preventDefault();
    var data = {
      title: this.refs.title.value,
      date: this.refs.date.value,
      amount: this.refs.amount.value
    };
    $.ajax({
      method: 'PUT',
      url: "/records/" + this.props.record.id,
      dataType: 'JSON',
      data: { record: data },
      success: function(data) {
        this.setState({edit: false});
        this.props.handleEditRecord(this.props.record, data)
      }.bind(this)
    });
  },

  render: function() {
    if (this.state.edit) {
      return this.recordForm();
    } else {
      return this.recordRow();
    }
  }
})
