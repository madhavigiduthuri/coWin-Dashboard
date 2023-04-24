// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {data} = props
  const COLORS = ['#2d87bb', '#a3df9f', '#64c2a6']
  return (
    <div>
      <h1 className="heading">Vaccination by age</h1>
      <PieChart width={400} height={300}>
        <Legend />
        <Pie
          data={data}
          startAngle={0}
          endAngle={360}
          innerRadius="0"
          outerRadius="60%"
          dataKey="count"
          labelLine
        >
          {data.map((each, index) => (
            <Cell
              key={each.count}
              name={each.age}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
