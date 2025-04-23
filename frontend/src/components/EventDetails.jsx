import { useParams } from 'react-router-dom';
import Header from '../components/Header'
import useFetch from '../useFetch';
import { Link } from 'react-router-dom'

const EventDetails = () => {
    const {data, loading, error} = useFetch("https://meetup-app-new.vercel.app/events")
    const { eventId } = useParams()

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data || !Array.isArray(data)) return <p>No events available</p>;

    const selectedEvent = data?.find((event) => event._id === eventId)
    console.log(selectedEvent)

    const formatDateTime = (isoString) => {
        const date = new Date(isoString)
        return date.toDateString() + ' at ' + date.toLocaleTimeString()
    }
    
return(
    <>
    <Header/>
    <main className='py-3' style={{backgroundColor: "#f0f2f5"}}>
        <div className='container'>
        <div className='row'>
            <div className='col-md-8'>
                <h2>{selectedEvent.name}</h2>
                <p className='p-0 m-0'>Hosted By:</p>
                <h6 className='fw-bold'>{selectedEvent.host}</h6>
                <img className="py-3 rounded" src={`/${selectedEvent.imageUrl}`} style={{width:"75%", height:"auto"}}/>
                <div style={{width:"75%"}}>
                <h5 className='fw-bold'>Details:</h5>
                <p>{selectedEvent.details}</p>
                <h5 className='fw-bold'>Additional Information:</h5>
                <p className='py-0 my-1'><strong>Dress Code: </strong>{selectedEvent.dressCode}</p>
                <p className='py-0 my-1'><strong>Age Restriction: </strong>{selectedEvent.ageRestriction === true ? "18 and above" : "No restriction"}  </p>
                <h5 className='fw-bold pt-2'>Event Tags:</h5>
                {
                    selectedEvent.tags.map((element) => {
                        return <div className='badge text-bg-danger p-2 m-1'>{element}</div>
                        
                    })
                }
                </div>
            </div>
            <div className='col-md-4 py-3 '>
                <div className='card p-4'>
                    <p className='m-0 p-0'> &#128338; {formatDateTime(selectedEvent.startTime)} to </p>
                    <p>{formatDateTime(selectedEvent.endTime)}</p>
                    <p><span style={{color: 'red'}}>&#128205;</span> {selectedEvent.location}</p>
                    <p>&#8377;  {selectedEvent.price}</p>
                </div>

                <div className='py-4'>
                    <h5 className='fw-bold'>Speakers: ({selectedEvent.speakers.length})</h5>
                    {/* {
                        selectedEvent.speakers.map((speaker) => (
                            <h6>{speaker}</h6>
                        ))
                    } */}
                </div>

            </div>
        </div>
        </div>
    </main>
    </>
)
}

export default EventDetails;