var ImageBox = React.createClass({

    getInitialState: function() {
        return {data: []}
    },

    componentDidMount: function() {
      this.loadInstagramFeed();
      setInterval(this.loadInstagramFeed, this.props.pollInterval);
    },

    loadInstagramFeed: function(){
      $.ajax({
        url: "/test.json",
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
      
    handleHashtagSubmit: function(hashtag) {
        var photos = this.state.data;
        // var newPhotos = photos.concat([{"embed": "https://instagram.com/p/4xHNOlTZEM/media"}])
        // this.setState({data: newPhotos})
        // var newPhoto = photos.concat([hashtag]);
        // this.setState({data: newPhoto});
        var arrayWithHashes = [];
        $.ajax({
          url: this.props.url,
          // dataType: 'json',
          type: 'POST',
          data: hashtag,
          success: function(responseData) {
              // this.setState({data: responseData})
            responseData.forEach(function(photo){
              newPhotos = photos.concat([{"embed": photo}]);
            });
            this.setState({data: newPhotos});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)

        });

    },

    render: function(){
        return (
          <div className="imageBox">
            See what is trending!
          <ImageForm onHashtagSubmit={this.handleHashtagSubmit} />
          <ImageList data={this.state.data} />
          </div>
        );
    }


});

var ImageList = React.createClass({
  render: function() {
    var images = this.props.data.map(function (image){
      return (
            <img src={image.embed}/>
        );
    });
      return(
        <div className="imageList">
          {images}
        </div>
        );
      }
});

var Image = React.createClass({
  render: function() {
    
    return ( 
      <div className="image">
        
      </div>
      );
  }

});

var ImageForm = React.createClass({
  handleSubmit: function(e){
        e.preventDefault();
        var hashtag = React.findDOMNode(this.refs.hashtag).value.trim();
        if (!hashtag){
          return;
        }
        this.props.onHashtagSubmit({hashtag: hashtag});
        React.findDOMNode(this.refs.hashtag).value = '';
        return;
      },

  render: function(){
    return (
      <form className="imageForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="hashtag" ref="hashtag"/>
        <input type="submit" value="Submit"/>
      </form>
  

      );
  }
});

    React.render(
      <ImageBox url="/instagram" data="/test.json" pollInterval={2000} />,
      document.getElementById('react-content')

      );