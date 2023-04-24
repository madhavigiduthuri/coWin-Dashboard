// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const pageStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    status: pageStatus.initial,
    last7DaysData: [],
    genderData: [],
    ageData: [],
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({status: pageStatus.inProgress})
    // console.log('getting vaccination')
    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(covidVaccinationDataApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const getLast7DaysVaccination = data.last_7_days_vaccination.map(
        eachVaccinationDay => ({
          vaccineDate: eachVaccinationDay.vaccine_date,
          dose1: eachVaccinationDay.dose_1,
          dose2: eachVaccinationDay.dose_2,
        }),
      )
      // console.log('lastestData', getLast7DaysVaccination)
      // const vaccinationByAge = data.vaccination_by_age.map(each => ({
      //   age: each.age,
      //   count: each.count,
      // }))
      // or
      // const vaccinationByAge = data.vaccination_by_age
      // console.log('updatedone', vaccinationByAge)

      // const vaccinationByGender = data.vaccination_by_gender
      // console.log('updated data', vaccinationByGender)
      this.setState({
        status: pageStatus.success,
        last7DaysData: getLast7DaysVaccination,
        genderData: data.vaccination_by_gender,
        ageData: data.vaccination_by_age,
      })
    } else {
      this.setState({status: pageStatus.failure})
    }
  }

  pageStatus = () => {
    const {last7DaysData, genderData, ageData} = this.state

    return (
      <>
        <VaccinationCoverage data={last7DaysData} />
        <VaccinationByGender data={genderData} />
        <VaccinationByAge data={ageData} />
      </>
    )
  }

  pageInProgress = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  pageFailure = () => (
    <div className="failure-page">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="heading">Something went wrong</h1>
    </div>
  )

  renderStatus = () => {
    const {status} = this.state
    switch (status) {
      case pageStatus.success:
        return this.pageStatus()
      case pageStatus.failure:
        return this.pageFailure()
      case pageStatus.inProgress:
        return this.pageInProgress()
      default:
        return null
    }
  }

  render() {
    const {loading, last7DaysData, genderData, ageData} = this.state
    return (
      <div className="cowinDashboard-container">
        <div className="dashboard-container">
          <div className="logo-container">
            <img
              className="logo"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <h1 className="main-heading">Co-WIN</h1>
          </div>
          <h1 className="heading">CoWIN Vaccination in India</h1>
          {this.renderStatus()}
        </div>
        )}
      </div>
    )
  }
}

export default CowinDashboard
