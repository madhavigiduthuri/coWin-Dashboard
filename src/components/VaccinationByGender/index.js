// Write your code here

import {PieChart, Pie, Cell, Legend} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {data} = props
  const COLORS = ['#f54394', '#5a8dee', '#2cc6c6']
  return (
    <div>
      <h1 className="heading">Vaccination by gender</h1>
      <PieChart
        width={400}
        height={300}
        // labelLine={true}
      >
        <Legend />
        <Pie
          data={data}
          startAngle={180}
          endAngle={0}
          innerRadius={40}
          outerRadius={100}
          fill="#8884d8"
          dataKey="count"
          labelLine
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.gender}
              name={entry.gender}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
