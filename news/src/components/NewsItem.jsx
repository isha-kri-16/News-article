import image from '../assets/image.jpg'

function NewsItem({ title, description, src, url }) {
    return (
        <>
            <div className="card  bg- text-light mb-3 d-inline-block my-3 mx-2 px-2 py2  " style={{ maxWidth: "345px", backgroundColor: "#F6F4F3" }}>
                <img src={src ? src : image} style={{ height: "200px", width: "324px", borderRadius: "10px", margin: "0px 10px" }} className="card-img-top my-2 py-1 px-1 mx-0  " alt="..." />
                <div className="card-body">
                    <h5 className="card-title" style={{ color: 'black' }}>{title.slice(0, 50)}</h5>
                    <p className="card-text" style={{ color: 'black' }} >{description ? description.slice(0, 90) : "News is a report of a current event. it is infomation about something that has just happened. "}</p>
                    <a href={url} className="btn btn-primary">Read More </a>
                </div>
            </div>
        </>
    )
}

export default NewsItem;












