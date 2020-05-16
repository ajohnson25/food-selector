import * as React from 'react';

interface Props{
  imageAttribution: string[]
}

class UnsplashTag extends React.Component<Props> {
  render () {
    return <div>
      <a id="unsplash-tag"
        href={`https://unsplash.com/${this.props.imageAttribution[0]}?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge`}
        target="_blank"
        rel = "noopener noreferrer"
        title = {`Download free do whatever you want high-resolution photos from ${this.props.imageAttribution[0]}`}>
        <span className="unsplash"><svg xmlns="http://www.w3.org/2000/svg" id="unsplash-svg" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span className="unsplash">{this.props.imageAttribution[1]}</span>
      </a>
    </div>;
  }
}

export default UnsplashTag;
