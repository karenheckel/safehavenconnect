import React from 'react'
import EventsChart from './Visualizations/EventsChart'
import ResourceChart from './Visualizations/ResourceChart'
import OrganizationsChart from './Visualizations/OrganizationsChart'

const Visualizations = () => {
  return (
    <div>
        <EventsChart />
        <ResourceChart />
        <OrganizationsChart />
    </div>
  )
}

export default Visualizations