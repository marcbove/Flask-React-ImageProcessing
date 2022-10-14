import './Image.css';
import React, {Component} from 'react';
import axios from 'axios'
import FormData from 'form-data'


class Image extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      id : "image",
      og_imageURI : null,
      proc_imageURI : null,
    }
  }

  create_img_tag()
  {
    let img_tag = null;
    if (this.state.og_imageURI !== null)
    {
        if (this.state.og_imageURI.startsWith('data:image'))
        {
            img_tag = (<img class="img img-thumbnail" name='originalImg' src={this.state.og_imageURI} alt=""></img>);
        }
        else
        {
            window.alert('An image must be selected');
        }
    }

    return img_tag;
  }

  create_img_tag_processed()
  {
    let img_tag = null;
    if (this.state.proc_imageURI !== null)
    {
        img_tag = (<img class="img img-thumbnail" name='processedImg' src={this.state.proc_imageURI} alt=""></img>);
    }

    return img_tag;
  }

  handle_change(event)
  {
    if(event.target.files && event.target.files[0])
    {
      let reader = new FileReader();
      reader.onload = function(ev)
      {
        this.setState({og_imageURI:ev.target.result});
      }.bind(this);
      reader.readAsDataURL(event.target.files[0]);
    }
    if (this.props.onChange !== undefined)
    {
        this.props.onChange(event);
    }
  }

  prepare_image()
  {
    console.log(this.state.id)
    let form_data = new FormData();
    form_data.append('File', this.state.og_imageURI);
    axios.post('http://localhost:3000', form_data, {
              headers: {
                'accept': 'application/json',
              }
          })
          .then((response) => { this.setState({proc_imageURI: response.data}); })
          .then((result) => { console.log('Success'); })
          .catch((error) => { console.error('Error:', error); });
  }

  render()
  {
    const og_imgTag = this.create_img_tag();
    const proc_imgTag = this.create_img_tag_processed();
    console.log(proc_imgTag)

    return (
    <form>
        <div class="row">
            <div class="col col-xs-1 text-center">
                <p>Original Image</p>
                {og_imgTag}
            </div>
            <div class="col col-xs-1 text-center">
                <p>Processed Image</p>
                {proc_imgTag}
            </div>
        </div>
        <div class="row">
            <div class="col col-xs-1 text-center">
                <input class="form-control" id={this.state.id} type="file" onChange={this.handle_change.bind(this)} accept="image/png, image/jpeg" />
            </div>
            <div class="col col-xs-1 text-center">
                <button class="btn btn-light" onClick={this.prepare_image.bind(this)} type="button">Process the image</button>
            </div>
        </div>
    </form>);
  }
}


export default Image;
