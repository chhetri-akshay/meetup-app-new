import { useState } from "react";
import { useEffect } from "react";
import useFetch from "../useFetch"
import Header from "./Header";
import { Link, useParams } from 'react-router-dom'

const AllEvent = () => {
    const {data, loading, error} = useFetch("https://meetup-app-new.vercel.app/events")
    const [filteredEvents, setFilteredEvents] = useState([])
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        if (data) {
          setFilteredEvents(data)
        }
      }, [data])

    if (loading) {
        return <div>Loading events...</div>;
    }
    if (error) {
        return <div>Error fetching events: {error}</div>;
    }

    const eventFilter = (event) => {
        const selectedValue = event.target.value
        if(selectedValue === "Both"){
            setFilteredEvents(data)
        } else {
            const filterEvents = data.filter((event) => event.eventType === selectedValue)
            setFilteredEvents(filterEvents)
        } 
    }

    const formatDateTime = (isoString) => {
        const date = new Date(isoString)
        return date.toDateString() + ' - ' + date.toLocaleTimeString()
    }

    const searchSubmitHandler = (event) => {
        event.preventDefault()
        const search = searchInput.toLowerCase()
        const filtered = data.filter((event) => event.name.toLowerCase().includes(search) || event.tags.some((tag) => tag.toLowerCase().includes(search)))
        return setFilteredEvents(filtered)
        
    }

    return (
        <>
        <Header/>
      <main style={{backgroundColor: "#f0f2f5"}}>
        <div className="container">
        

        <div className="d-flex mb-1">
            

            <div className="me-auto py-2 my-2">
                <h1 className="fw-bold">Meetup Events</h1>
            </div>

            <div className="py-2 my-3 px-4">
                <form className="d-flex" onSubmit={searchSubmitHandler}>
                    <input className="form-control me-2" type="text" placeholder="Search by title and tags" value={searchInput} onChange={(event) => setSearchInput(event.target.value)}/>
                    <button className="btn btn-outline-dark" type="submit">Search</button>
                </form>
            </div>

            <div className=" py-2 my-3">
                <select className="form-select" aria-label="Select Event Type" onChange={eventFilter}>
                    <option value="Both">Select Event Type</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Both">Both</option>
                </select>
            </div>
        </div>

        
        
        
        <section>
            <div className="row">
                {
                    filteredEvents?.map((event) => (
                        <div className="col-md-4 p-4" key={event._id}>
                            <div className="card  card h-100 border border-0">
                                <Link to={`/eventDetails/${event._id}`}><img src={event.imageUrl} alt="event picture" className="rounded card-img-top" style={{ height: "300px", objectFit: "cover" }}/></Link>
                                <div className="card-body p-0 m-0" style={{backgroundColor: "#f0f2f5"}}>
                                    <p className="card-text py-0 my-0">{formatDateTime(event.startTime)}</p>
                                    <h5 className="card-title py-0 my-0 fw-bold">{event.name}</h5>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
        </div>
    </main>
    </>
    )
}

export default AllEvent