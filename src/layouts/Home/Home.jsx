import React from "react";
import MDBox from "components/Charts/Box/Box";
import Grid from "@mui/material/Grid";

import ComplexStatisticsCard from "components/Charts/ComplexStatisticsCard/ComplexStatisticsCard";
import ReportsBarChart from "components/Charts/ReportsBarChart/ReportsBarChart";
import ReportsLineChart from "components/Charts/ReportsLineChart/ReportsLineChart";

import reportsBarChartData from "../../data/reportsData/reportsBarChartData";
import reportsLineChartData from "../../data/reportsData/reportsLineChartData";

import Table from "../../components/Charts/Table/Table";

import "./Home.css";
import PropTypes from "prop-types";

function Home() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <div className="body1">
      <MDBox py={1} px={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={0.0}>
              <ComplexStatisticsCard
                color="linear-gradient( #FFDBFE  , #DE90A3)"
                icon="weekend"
                title="Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="linear-gradient( #E8E8E9  ,#BDA2F9)"
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="linear-gradient( #B2DEDB  ,#CAFFE6)"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="linear-gradient( #FDF5B3  ,#F4D0AA)"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="linear-gradient( #F49E9E  ,#FFC7FD)"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="linear-gradient( #EAE6F5  ,#F7C7FF)"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="linear-gradient( #FEC877  ,#F7C7FF)"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      {/* <Table /> */}
    </div>
  );
}

export default Home;
