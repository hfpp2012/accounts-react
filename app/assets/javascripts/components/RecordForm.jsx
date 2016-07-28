var RecordForm = React.createClass({
  getInitialState: function() {
    return (
      {title: '', date: '', amount: ''}
    );
  },

  handleChange: function(e) {
    var name, obj;
    name = e.target.name;
    return this.setState((
      obj = {},
      obj["" + name] = e.target.value,
      obj
    ));
  },

  valid: function() {
    return this.state.title && this.state.date && this.state.amount
  },

  handleSubmit: function(e) {
    e.preventDefault();
    $.post('/records', { record: this.state }, function(data) {
      this.props.handleNewRecord(data);
      this.setState(this.getInitialState());
    }.bind(this), 'JSON');
  },

  render: function() {
    return (
      <form className='form-inline' onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Date' name='date' value={this.state.date} onChange={this.handleChange} />
        </div>
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Title' name='title' value={this.state.title} onChange={this.handleChange} />
        </div>
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Amount' name='amount' value={this.state.amount} onChange={this.handleChange} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create record</button>
      </form>
    )
  }
});
