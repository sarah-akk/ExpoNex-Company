import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/Charts/Box/Box";
import MDTypography from "components/Typography/Typography";

// ReportsBarChart configurations
import configs from "components/Charts/ReportsLineChart/configs";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ReportsBarChart({ color, title, description, date, chart }) {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

  return (
    <MDBox padding="1rem" sx={{ bgcolor: "#565768" }}>
      {useMemo(
        () => (
          <MDBox
            variant="gradient"
            bgColor={color}
            borderRadius="15px"
            coloredShadow={color}
            py={2}
            pr={0.5}
            mt={-1}
            height="12.5rem"
          >
            <Bar data={data} options={options} redraw />
          </MDBox>
        ),
        [color, chart]
      )}
      <MDBox pt={3} pb={1} px={1} sx={{ bgcolor: "#565768" }}>
        <MDTypography variant="h6" textTransform="capitalize">
          {title}
        </MDTypography>
        <MDTypography component="div" variant="button" color="text" fontWeight="light">
          {description}
        </MDTypography>
        <Divider />
        <MDBox display="flex" alignItems="center">
          <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
            <Icon>schedule</Icon>
          </MDTypography>
          <MDTypography variant="button" color="text" fontWeight="light">
            {date}
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of ReportsBarChart
ReportsBarChart.defaultProps = {
  color: "info",
  description: "",
};

// Typechecking props for the ReportsBarChart
ReportsBarChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.string.isRequired,
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default ReportsBarChart;
