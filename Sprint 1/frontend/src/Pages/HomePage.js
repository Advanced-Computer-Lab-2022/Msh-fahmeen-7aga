import {Link } from "react-router-dom";

const HomePage = () => {
    return(
        <div className="HomePage">
            <Link to="/Instructor"><button>
              Instructor
            </button>
            </Link>
            <Link to="/admin"><button>
              Adminstrator
            </button>
            </Link>

            <Link to="/guest"><button>
              Guest
            </button>
            </Link>
            <Link to="/studentlogin"><button>
              Student Login
            </button>
            </Link>
            <Link to="/trainee"><button>
              Trainee
            </button>
            </Link>
            <Link to="/studentsignup"><button>
              Student Sign up
            </button>
            </Link>
        </div>
    )
}

export default HomePage