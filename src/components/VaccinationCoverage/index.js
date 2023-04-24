// Write your code here
// Write your code here
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {data} = props
  console.log('coverage', data)

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div>
      <h1 className="heading">vaccination Coverage</h1>
      <BarChart
        data={data}
        margin={{
          top: 5,
        }}
        width={1000}
        height={500}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" barSize="10%" />
        <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="10%" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
