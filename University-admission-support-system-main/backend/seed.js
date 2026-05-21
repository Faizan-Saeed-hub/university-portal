const connectDB = require("./db");
const University = require("./models/University");

connectDB();

const seed = async () => {
  await University.deleteMany();

  await University.insertMany([
    // ================= university of sargodha =================
    {
      name: "University of Sargodha",
      city: "Sargodha",
      type: "Public",
      averageFee: 48000,
      hostel: true,
      logo: "uos",
      website: "https://su.edu.pk",
      departments: [
        // ================= COMPUTER SCIENCE =================
        {
          name: "Computer Science",
          fee: "57300 / Semester",
          courses: [
            "BS in Computer Science",
            "BS in Artificial Intelligence",
            "BS in Data Science"
          ],
          programs: [
            {
              title: "BS Computer Science",
              duration: "4 Years",
              eligibility: "At least 50% marks in Intermediate (HSSC) or equivalent",
              requiredDegree: "FSc pre-medical, FSc pre-engineering, ICS, ICom, DAE"
            },
            {
              title: "BS Artificial Intelligence",
              duration: "4 Years",
              eligibility: "At least 50% marks in Intermediate (HSSC) or equivalent",
              requiredDegree: "FSc pre-medical, FSc pre-engineering,ICS,  ICOM,  DAE"
            },
            {
              title: "BS DATA SCIENCE",
              duration: "4Years",
              eligibility: "At least 45% marks in Intermediate and 45%marks in matric",
              requiredDegree: "FSc. Pre Medical, FSc. Pre Engineering,ICS,  ICOM,  DAE"
            }
          ],
          meritFormula: {
            formulaType: "uos",
            matric: 0.40,
            inter: 0.60,
            entryTest: 0,
            requiredMerit: 70,
            entryTestRequired: false
          },
          cutoffHistory: {
            year2024: 70,
            year2023: 71,
            year2022: 74
          },
          similarPrograms: [
            {
              name: "BS Software Engineering",
              merit: 70
            },
            {
              name: "BS Data Science",
              merit: 70
            },
            {
              name: "BS Artificial Intelligence",
              merit: 70
            },
            {
              name: " BS Information Technology",
              merit: 70
            },
            {
              name: "BS Cyber Security",
              merit: 70
            }
          ],
          applyLink:
            "https://admissions.su.edu.pk/"
        },
        // ================= INFORMATION TECHNOLOGY =================
        {
          name: "Information Technology",
          fee: "57300 / Semester",
          courses: [
            "BS Information Technology",
            "BS Cyber Security"
          ],
          programs: [
            {
              title: "BS Information Technology",
              duration: "4 Years",
              eligibility: "At least 50% marks in Intermediate (HSSC) or equivalent",
              requiredDegree: "ICS, FSc pre-medical, FSc pre-engineering, DAE"
            },
            {
              title: "BS CYBER SECURITY",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate and 45%marks in matric",
              requiredDegree: "ICS, FSc. Pre Medical, FSc. Pre Engineering, DAE"
            },
          ],
          meritFormula: {
            formulaType: "uos",
            matric: 0.40,
            inter: 0.60,
            entryTest: 0,
            requiredMerit: 70,
            entryTestRequired: false
          },
          cutoffHistory: {
            year2024: 70,
            year2023: 71,
            year2022: 74
          },
          similarPrograms: [
            {
              name: "BS Software Engineering",
              merit: 70
            },
            {
              name: "BS Data Science",
              merit: 70
            },
            {
              name: "BS Artificial Intelligence",
              merit: 70
            },
            {
              name: " BS Computer Science",
              merit: 70
            },
            {
              name: "BS Cyber Security",
              merit: 70
            }
          ],
          applyLink:
            "https://admissions.su.edu.pk/"
        },
        // ================= SOFTWARE ENGINEERING =================
        {
          name: "Software Engineering",
          fee: "57300 / Semester",
          courses: [
            "BS Software Engineering"
          ],
          programs: [
            {
              title: "BS Software Engineering",
              duration: "4 Years",
              eligibility: "At least 50% marks in Intermediate (HSSC) or equivalent",
              requiredDegree: "ICS, FSc. Pre Medical, FSc. Pre Engineering,"
            }
          ],
          meritFormula: {
            formulaType: "uos",
            matric: 0.40,
            inter: 0.60,
            entryTest: 0,
            requiredMerit: 70,
            entryTestRequired: false
          },
          cutoffHistory: {
            year2024: 71,
            year2023: 72,
            year2022: 74
          },
          similarPrograms: [
            {
              name: "BS Computer Science",
              merit: 55
            },
            {
              name: "BS Data Science",
              merit: 70
            },
            {
              name: "BS Artificial Intelligence",
              merit: 70
            },
            {
              name: " BS Information Technology",
              merit: 70
            },
            {
              name: "BS Cyber Security",
              merit: 70
            }
          ],
          applyLink:
            "https://admissions.su.edu.pk/"
        },
        // ================= ENGLISH =================
        {
          name: "English",
          fee: "43000/semester",
          courses: [
            "BS English",
          ],
          programs: [
            {
              title: "BS English",
              duration: "4 Years",
              eligibility: "At least 45% marks in HSSC (FA, FSc, ICS, I.Com, D.Com) Part-I / II), DAE (1st & 2nd Year) or Equivalent qualification",
              requiredDegree: "FSc. Pre Medical, FSc. Pre Engineering, FA , A-Level, ICS , I.Com , D.Com,  DAE , FA (IT) , DAE (Mining)"
            }
          ],
          meritFormula: {
            formulaType: "uos",
            matric: 0.40,
            inter: 0.60,
            entryTest: 0,
            requiredMerit: 55,
            entryTestRequired: false
          },
          cutoffHistory: {
            year2024: 55,
            year2023: 57,
            year2022: 60
          },
          similarPrograms: [
            {
              name: "BS Applied Psychology",
              merit: 50
            },
            {
              name: "BS Political Science",
              merit: 70
            },
            {
              name: "BS International Relations",
              merit: 70
            }
          ],
          applyLink:
            "https://admissions.su.edu.pk/"
        },

        // ================= MEDIA & COMMUNICATION =================
        {
          name: "Media & Communication Studies",
          fee: "43000/semester",
          courses: [
            "BS Media & Communication Studies",
            "BS Digital and Social Media",
            "BS Strategic Communication",
            "BS Theatre Film and Television"
          ],
          programs: [
            {
              title: "BS Media & Communication Studies",
              duration: "4 Years",
              eligibility: "At least 45% marks in HSSC (FA, FSc, ICS, I.Com, D.Com) Part-I / II), DAE (1st & 2nd Year) or Equivalent qualification",
              requiredDegree: "FSc. Pre Medical, FSc. Pre Engineering, FA , A-Level, ICS , I.Com , D.Com,  DAE , FA (IT) , DAE (Mining)"
            },
            {
              title: "BS Digital and Social Media",
              duration: "4 Years",
              eligibility: "At least 45% marks in HSSC (FA, FSc, ICS, I.Com, D.Com) Part-I / II), DAE (1st & 2nd Year) or Equivalent qualification",
              requiredDegree: "FSc. Pre Medical, FSc. Pre Engineering, FA , A-Level, ICS , I.Com , D.Com,  DAE , FA (IT) , DAE (Mining)"
            },
            {
              title: "BS Strategic Communication",
              duration: "4 Years",
              eligibility: "At least 45% marks in HSSC (FA, FSc, ICS, I.Com, D.Com) Part-I / II), DAE (1st & 2nd Year) or Equivalent qualification",
              requiredDegree: "FSc. Pre Medical, FSc. Pre Engineering, FA , A-Level, ICS , I.Com , D.Com,  DAE , FA (IT) , DAE (Mining)"
            },
            {
              title: "BS Theatre Film and Television",
              duration: "4 Years",
              eligibility: "At least 45% marks in HSSC (FA, FSc, ICS, I.Com, D.Com) Part-I / II), DAE (1st & 2nd Year) or Equivalent qualification",
              requiredDegree: "FSc. Pre Medical, FSc. Pre Engineering, FA , A-Level, ICS , I.Com , D.Com,  DAE , FA (IT) , DAE (Mining)"
            },
          ],

          meritFormula: {
            formulaType: "uos",
            matric: 0.40,
            inter: 0.60,
            entryTest: 0,
            requiredMerit: 50,
            entryTestRequired: false
          },
          cutoffHistory: {
            year2024: 50,
            year2023: 51,
            year2022: 54
          },
          similarPrograms: [
            {
              name: "BS English Literature",
              merit: 50
            },
            {
              name: "BS Applied Psychology",
              merit: 50
            },
            {
              name: "BS Political Science",
              merit: 70
            }
          ],
          applyLink:
            "https://admissions.su.edu.pk/"
        },
        // ================= ARABIC =================
        {
          name: "Arabic",
          fee: "43000/semester",
          courses: [
            "BS Arabic",
          ],
          programs: [
            {
              title: "BS Arabic",
              duration: "4 Years",
              eligibility: "At least 45% marks in HSSC (FA, FSc, ICS, I.Com, D.Com) Part-I / II), DAE (1st & 2nd Year) or Equivalent qualification",
              requiredDegree: "FSc. Pre Medical, FSc. Pre Engineering, FA , A-Level, ICS , I.Com , D.Com,  DAE , FA (IT) , DAE (Mining)"
            }
          ],
          meritFormula: {
            formulaType: "uos",
            matric: 0.40,
            inter: 0.60,
            entryTest: 0,
            requiredMerit: 50,
            entryTestRequired: false
          },
          cutoffHistory: {
            year2024: 50,
            year2023: 50,
            year2022: 51
          },
          similarPrograms: [
            {
              name: "BS Physics",
              merit: 71
            },
            {
              name: "BS Computational Physics",
              merit: 64
            },
            {
              name: "BS Chemistry",
              merit: 51
            }
          ],
          applyLink:
            "https://admissions.su.edu.pk/"
        },
        // ================= ISLAMIC STUDIES =================
        {
          name: "Islamic Studies",
          fee: "43000/semester",
          courses: [
            "BS Islamic Studies",
          ],
          programs: [
            {
              title: "BS Islamic Studies",
              duration: "4 Years",
              eligibility: "At least 45% marks in HSSC (FA, FSc, ICS, I.Com, D.Com) Part-I / II), DAE (1st & 2nd Year) or Equivalent qualification",
              requiredDegree: "FSc. Pre Medical, FSc. Pre Engineering, FA , A-Level, ICS , I.Com , D.Com,  DAE , FA (IT) , DAE (Mining)"
            }
          ],
          meritFormula: {
            formulaType: "uos",
            matric: 0.40,
            inter: 0.60,
            entryTest: 0,
            requiredMerit: 50,
            entryTestRequired: false
          },
          cutoffHistory: {
            year2024: 50,
            year2023: 50,
            year2022: 50
          },
          similarPrograms: [
            {
              name: "BS Chemistry",
              merit: 51
            },
            {
              name: "BS Computational Physics",
              merit: 64
            },
            {
              name: "BS Physics",
              merit: 71
            }
          ],
          applyLink:
            "https://admissions.su.edu.pk/"
        },
        // ================= URDU =================
        {
          name: "Urdu",
          fee: "43000/semester",
          courses: [
            "BS Urdu",
          ],
          programs: [
            {
              title: "BS Urdu",
              duration: "4 Years",
              eligibility: "At least 45% marks in HSSC (FA, FSc, ICS, I.Com, D.Com) Part-I / II), DAE (1st & 2nd Year) or Equivalent qualification",
              requiredDegree: "FSc. Pre Medical, FSc. Pre Engineering, FA , A-Level, ICS , I.Com , D.Com,  DAE , FA (IT) , DAE (Mining)"
            }
          ],
          meritFormula: {
            formulaType: "uos",
            matric: 0.40,
            inter: 0.60,
            entryTest: 0,
            requiredMerit: 50,
            entryTestRequired: false
          },
          cutoffHistory: {
            year2024: 50,
            year2023: 50,
            year2022: 50
          },
          similarPrograms: [
            {
              name: "BS Computational Physics",
              merit: 64
            },
            {
              name: "BS Physics",
              merit: 71
            },
            {
              name: "BS Chemistry",
              merit: 51
            }
          ],
          applyLink:
            "https://admissions.su.edu.pk/"
        },
        // ================= PUNJABI =================
        {
          name: "Punjabi",
          fee: "43000/semester",
          courses: [
            "BS Punjabi"
          ],
          programs: [
            {
              title: "BS Punjabi",
              duration: "4 Years",
              eligibility: "At least 45% marks in HSSC (FA, FSc, ICS, I.Com, D.Com) Part-I / II), DAE (1st & 2nd Year) or Equivalent qualification",
              requiredDegree: "FSc. Pre Medical, FSc. Pre Engineering, FA , A-Level, ICS , I.Com , D.Com,  DAE , FA (IT) , DAE (Mining)"
            }
          ],
          meritFormula: {
            formulaType: "uos",
            matric: 0.40,
            inter: 0.60,
            entryTest: 0,
            requiredMerit: 50,
            entryTestRequired: false
          },
          cutoffHistory: {
            year2024: 50,
            year2023: 50,
            year2022: 50
          },
          similarPrograms: [
            {
              name: "BS Chemistry",
              merit: 51
            },
            {
              name: "BS Physics",
              merit: 71
            },
            {
              name: "BS Mathematics",
              merit: 62
            }
          ],
          applyLink:
            "https://admissions.su.edu.pk/"
        },
        // ================= SPORTS SCIENCES =================
        {
          name: "Sports Sciences",
          fee: "43000/semester",
          courses: [
            "BS Physical Education",
          ],
          programs: [
            {
              title: "BS Physical Education",
              duration: "4 Years",
              eligibility: "At least 45% marks in HSSC (FA, FSc, ICS, I.Com, D.Com) Part-I / II), DAE (1st & 2nd Year) or Equivalent qualification",
              requiredDegree: "FSc. Pre Medical, FSc. Pre Engineering, FA , A-Level, ICS , I.Com , D.Com,  DAE , FA (IT) , DAE (Mining)"
            }
          ],
          meritFormula: {
            formulaType: "uos",
            matric: 0.40,
            inter: 0.60,
            entryTest: 0,
            requiredMerit: 51,
            entryTestRequired: false
          },
          cutoffHistory: {
            year2024: 51,
            year2023: 53,
            year2022: 56
          },
          similarPrograms: [
            {
              name: "BS Computational Physics",
              merit: 64
            },
            {
              name: "BS Statistics",
              merit: 70
            },
            {
              name: "BS Mathematics",
              merit: 62
            }
          ],
          applyLink:
            "https://admissions.su.edu.pk/"
        },

        // ================= FINE ARTS =================
        {
          name: "Fine Arts",
          fee: "49600/semester",
          courses: [
            "BS Fine Arts",
            "BS Graphic Design",
            "BS Interior Design",
            "Bachelors in Textile Design"
          ],
          programs: [
            {
              title: "BS Fine Arts",
              duration: "4 Years",
              eligibility: "At least 45% marks in HSSC (FA, FSc, ICS, I.Com, D.Com) Part-I / II), DAE (1st & 2nd Year) or Equivalent qualification",
              requiredDegree: "FSc. Pre Medical, FSc. Pre Engineering, FA , A-Level, ICS , I.Com , D.Com,  DAE , FA (IT) , DAE (Mining)"
            },
            {
              title: "BS Graphic Designer",
              duration: "4 Years",
              eligibility: "At least 45% marks in HSSC (FA, FSc, ICS, I.Com, D.Com) Part-I / II), DAE (1st & 2nd Year) or Equivalent qualification",
              requiredDegree: "FSc. Pre Medical, FSc. Pre Engineering, FA , A-Level, ICS , I.Com , D.Com,  DAE , FA (IT) , DAE (Mining)"
            },
            {
              title: "BS Interior Design",
              duration: "4 Years",
              eligibility: "At least 45% marks in HSSC (FA, FSc, ICS, I.Com, D.Com) Part-I / II), DAE (1st & 2nd Year) or Equivalent qualification",
              requiredDegree: "FSc. Pre Medical, FSc. Pre Engineering, FA , A-Level, ICS , I.Com , D.Com,  DAE , FA (IT) , DAE (Mining)"
            },
            {
              title: "Bachelor in Textile Design",
              duration: "4 Years",
              eligibility: "At least 45% marks in HSSC (FA, FSc, ICS, I.Com, D.Com) Part-I / II), DAE (1st & 2nd Year) or Equivalent qualification",
              requiredDegree: "FSc. Pre Medical, FSc. Pre Engineering, FA , A-Level, ICS , I.Com , D.Com,  DAE , FA (IT) , DAE (Mining)"
            },
          ],
          meritFormula: {
            formulaType: "uos",
            matric: 0.40,
            inter: 0.60,
            entryTest: 0,
            requiredMerit: 55,
            entryTestRequired: false
          },
          cutoffHistory: {
            year2024: 56,
            year2023: 58,
            year2022: 61
          },
          similarPrograms: [
            {
              name: "BS Physics",
              merit: 71
            },
            {
              name: "BS Computational Physics",
              merit: 64
            },
            {
              name: "BS Chemistry",
              merit: 51
            }
          ],
          applyLink:
            "https://admissions.su.edu.pk/"
        },

        // ================= AGRICULTURE =================
        {
          name: "Agriculture",
          fee: "43,000 / Semester",
          courses: [
            "BSc Hons Agriculture",
            "BSc Hons Agriculture Agronomy",
            "BSc Hons Agriculture Horticulture",
            "BSc Hons Agriculture Entomology",
            "BSc Hons Agriculture Plant Pathology",
            "BSc Hons Agriculture Soil Science"
          ],
          programs: [
            {
              title: "BSc Hons Agriculture",
              duration: "4 Years",
              eligibility: "50% marks in FSc Pre-Medical / Pre-Engineering",
              requiredDegree: "FSc Pre-Medical FSc Pre-Engineering"
            },
            {
              title: "BSc Hons Agriculture Agronomy ",
              duration: "4 Years",
              eligibility: "50% marks in FSc Pre-Medical / Pre-Engineering",
              requiredDegree: "FSc Pre-Medical FSc Pre-Engineering"
            },
            {
              title: "BSc Hons Agriculture Horticulture",
              duration: "4 Years",
              eligibility: "50% marks in FSc Pre-Medical / Pre-Engineering",
              requiredDegree: "FSc Pre-Medical FSc Pre-Engineering"
            },
            {
              title: "BSc Hons Agriculture Entomology",
              duration: "4 Years",
              eligibility: "50% marks in FSc Pre-Medical / Pre-Engineering",
              requiredDegree: "FSc Pre-Medical FSc Pre-Engineering"
            },
            {
              title: "BSc Hons Agriculture Plant Pathology",
              duration: "4 Years",
              eligibility: "50% marks in FSc Pre-Medical / Pre-Engineering",
              requiredDegree: "FSc Pre-Medical FSc Pre-Engineering"
            },
            {
              title: "BSc Hons Agriculture Soil Science",
              duration: "4 Years",
              eligibility: "50% marks in FSc Pre-Medical / Pre-Engineering",
              requiredDegree: "FSc Pre-Medical FSc Pre-Engineering"
            },
          ],
          meritFormula: {
            formulaType: "uos",
            matric: 0.40,
            inter: 0.60,
            entryTest: 0,
            requiredMerit: 65,
            entryTestRequired: false
          },
          cutoffHistory: {
            year2024: 65,
            year2023: 67,
            year2022: 68
          },
          similarPrograms: [
            {
              name: "BS Computational Physics",
              merit: 64
            },
            {
              name: "BS Mathematics",
              merit: 62
            },
            {
              name: "BS Statistics",
              merit: 70
            }
          ],
          applyLink:
            "https://admissions.su.edu.pk/"
        },

        // ================= FOOD SCIENCE =================
        {
          name: "Food Science & Nutrition",
          fee: "48500/semester",
          courses: [
            "BSc Hons Food Science and Technology",
            "BSc Hons Human Nutrition and Dietetics",
            "BSc Hons Home Economics"
          ],
          programs: [
            {
              title: "BSc Hons Food Science and Technology",
              duration: "4 Years",
              eligibility: "50% marks in FSc Pre-Medical / Pre-Engineering",
              requiredDegree: "FSc Pre-Medical FSc Pre-Engineering"
            },
            {
              title: "BSc Hons Human Nutrition and Dietetics ",
              duration: "4 Years",
              eligibility: "50% marks in FSc Pre-Medical / Pre-Engineering",
              requiredDegree: "FSc Pre-Medical FSc Pre-Engineering"
            },
            {
              title: "BSc Hons Home Economics",
              duration: "4 Years",
              eligibility: "50% marks in FSc Pre-Medical / Pre-Engineering",
              requiredDegree: "FSc Pre-Medical FSc Pre-Engineering"
            },


          ],

          meritFormula: {
            formulaType: "uos",
            matric: 0.40,
            inter: 0.60,
            entryTest: 0,
            requiredMerit: 64,
            entryTestRequired: false
          },
          cutoffHistory: {
            year2024: 64,
            year2023: 66,
            year2022: 67
          },
          similarPrograms: [
            {
              name: "BS Mathematics",
              merit: 62
            },
            {
              name: "BS Computational Physics",
              merit: 64
            },
            {
              name: "BS Chemistry",
              merit: 51
            }
          ],
          applyLink:
            "https://admissions.su.edu.pk/"
        },

        // ================= LAW =================
        {
          name: "Law",
          fee: "49,600 / Semester",
          courses: [
            "LLB 5 Years"
          ],
          programs: [
            {
              title: "LLB 5 Years",
              duration: "5 Years",
              eligibility: "At least 50% marks in Intermediate (FA, FSc, ICS, I.Com, DAE, A-Level, D.Com) or Equivalent qualification and LAT test is compulsory with at least 50% marks.",
              requiredDegree: "FA + LAT,FSc + LAT, I.Com + LAT, ICS + LAT ,DAE + LAT, A-Level + LAT ,D.Com + LAT ,"
            }
          ],
          meritFormula: {
            formulaType: "uos-law",
            requiredMerit: 62,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 63,
            year2023: 65,
            year2022: 67
          },
          similarPrograms: [
            {
              name: "BS Media Studies",
              merit: 71
            },
            {
              name: "BS International Relations",
              merit: 70
            },
            {
              name: "BS Political Science",
              merit: 70
            }
          ],
          applyLink:
            "https://admissions.su.edu.pk/"
        },
        // ================= COLLEGE OF ENGINEERING AND TECHNOLOGY =================
        {
          name: "COLLEGE OF ENGINEERING AND TECHNOLOGY",
          fee: "69200/semester",
          courses: [
            "BSc Mechanical Engineering",
            "BSc Electrical Engineering"
          ],
          programs: [
            {
              title: "BSc Mechanical Engineering",
              duration: "4 Years",
              eligibility: "t least 60 % marks in  HSSC (Part-I / II) Pre-Engineering, ICS or Equivalent Relevant DAE (1st and 2nd years/1st, 2nd & 3rd year) PEC designated entry test such as UET (ECAT 2024), NUST, NED, ETA, MUE, NTS",
              requiredDegree: "FSc. Pre Engineering ICS A-Level DAE in relevant field"
            },
            {
              title: "BSc Electrical Engineering",
              duration: "4 Years",
              eligibility: "t least 60 % marks in  HSSC (Part-I / II) Pre-Engineering, ICS or Equivalent Relevant DAE (1st and 2nd years/1st, 2nd & 3rd year) PEC designated entry test such as UET (ECAT 2024), NUST, NED, ETA, MUE, NTS",
              requiredDegree: "FSc. Pre Engineering ICS A-Level DAE in relevant field"
            }
          ],
          meritFormula: {
            formulaType: "uos-engineering",
            matric: 0.17,
            inter: 0.60,
            entryTest: 0.33,
            requiredMerit: 71,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 71,
            year2023: 72,
            year2022: 74
          },
          similarPrograms: [
            {
              name: "BS Physics",
              merit: 71
            },
            {
              name: "BS Statistics",
              merit: 70
            },
            {
              name: "BS Computational Physics",
              merit: 64
            }
          ],
          applyLink:
            "https://admissions.su.edu.pk/"
        },

        // ================= ENGINEERING TECHNOLOGY =================
        {
          name: "B.E.Tech",
          fee: "69200/semester",
          courses: [
            "B.E.Tech Mechanical",
            "B.E.Tech Electrical",
            "B.E.Tech Civil"
          ],
          programs: [
            {
              title: "B.E.Tech Mechanical",
              duration: "4 Years",
              eligibility: "t least 60 % marks in  HSSC (Part-I / II) Pre-Engineering, ICS or Equivalent Relevant DAE (1st and 2nd years/1st, 2nd & 3rd year) PEC designated entry test such as UET (ECAT 2024), NUST, NED, ETA, MUE, NTS",
              requiredDegree: "FSc. Pre Engineering ICS A-Level DAE in relevant field"
            },
            {
              title: "B.E.Tech Electrical",
              duration: "4 Years",
              eligibility: "t least 60 % marks in  HSSC (Part-I / II) Pre-Engineering, ICS or Equivalent Relevant DAE (1st and 2nd years/1st, 2nd & 3rd year) PEC designated entry test such as UET (ECAT 2024), NUST, NED, ETA, MUE, NTS",
              requiredDegree: "FSc. Pre Engineering ICS A-Level DAE in relevant field"
            },
            {
              title: "B.E.Tech Civil",
              duration: "4 Years",
              eligibility: "t least 60 % marks in  HSSC (Part-I / II) Pre-Engineering, ICS or Equivalent Relevant DAE (1st and 2nd years/1st, 2nd & 3rd year) PEC designated entry test such as UET (ECAT 2024), NUST, NED, ETA, MUE, NTS",
              requiredDegree: "FSc. Pre Engineering ICS A-Level DAE in relevant field"
            }
          ],
          meritFormula: {
            formulaType: "uos-betech",
            matric: 0,
            inter: 0.60,
            entryTest: 0.30,
            requiredMerit: 71,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 72,
            year2023: 73,
            year2022: 76
          },
          similarPrograms: [
            {
              name: "BS Statistics",
              merit: 70
            },
            {
              name: "BS Mathematics",
              merit: 62
            },
            {
              name: "BS Chemistry",
              merit: 51
            }
          ],
          applyLink:
            "https://admissions.su.edu.pk/"
        }
      ]
    },
    // ================= University of Punjab =================
    {
      name: "University of Punjab",
      city: "Lahore",
      type: "Public",
      averageFee: 120000,
      hostel: true,
      logo: "uop",
      website: "https://pu.edu.pk",
      departments: [
        // ================= COMPUTER SCIENCE =================
        {
          name: "Computer Science",
          fee: "71,140 / Semester",
          courses: [
            "BS Computer Science"
          ],
          programs: [
            {
              title: "BS Computer Science",
              duration: "4 Years",
              eligibility: "At least 50% marks in ICS, F.Sc Pre-Engineering, or Intermediate with Mathematics & Physics. Max age 24 years.",
              requiredDegree: "ICS, F.Sc Pre-Engineering, or Intermediate with Mathematics & Physics"
            }
          ],
          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 77,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 77,
            year2023: 79,
            year2022: 81
          },
          similarPrograms: [
            {
              name: "BS Software Engineering",
              merit: 75
            },
            {
              name: "BS Data Science",
              merit: 74
            },
            {
              name: "BS Artificial Intelligence",
              merit: 75
            },
            {
              name: " BS Information Technology",
              merit: 77
            },
            {
              name: "BS Cyber Security",
              merit: 81
            }
          ],
          applyLink:
            "http://admissions.pu.edu.pk/"
        },
        // ================= DATA SCIENCE =================
        {
          name: "Data Science",
          fee: "71,140 / Semester",
          courses: [
            "BS Data Science",
            "BS Cyber Security"
          ],
          programs: [
            {
              title: "BS Data Science",
              duration: "4 Years",
              eligibility: "At least 50% marks in ICS, F.Sc Pre-Engineering, or Intermediate with Mathematics & Physics. Max age 24 years.",
              requiredDegree: "ICS, F.Sc Pre-Engineering, or Intermediate with Mathematics & Physics"
            },
            {
              title: "BS Cyber Security",
              duration: "4 Years",
              eligibility: "At least 50% marks in ICS, F.Sc Pre-Engineering, or Intermediate with Mathematics & Physics. Max age 24 years.",
              requiredDegree: "ICS, F.Sc Pre-Engineering, or Intermediate with Mathematics & Physics"
            }
          ],
          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 74,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 74,
            year2023: 75,
            year2022: 78
          },
          similarPrograms: [
            {
              name: "BS Software Engineering",
              merit: 75
            },
            {
              name: "BS Computer Science",
              merit: 77
            },
            {
              name: "BS Information Technology",
              merit: 77
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        },
        // ================= INFORMATION TECHNOLOGY =================
        {
          name: "Information Technology",
          fee: "71,140 / Semester",
          courses: [
            "BS Information Technology",
            "BS Artificial Intelligence"
          ],
          programs: [
            {
              title: "BS Information Technology",
              duration: "4 Years",
              eligibility: "At least 50% marks in ICS, F.Sc Pre-Engineering, or Intermediate with Mathematics & Physics. Max age 24 years.",
              requiredDegree: "ICS, F.Sc Pre-Engineering, or Intermediate with Mathematics & Physics"
            },
            {
              title: "BS Artificial Intelligence",
              duration: "4 Years",
              eligibility: "At least 50% marks in ICS, F.Sc Pre-Engineering, or Intermediate with Mathematics & Physics. Max age 24 years.",
              requiredDegree: "ICS, F.Sc Pre-Engineering, or Intermediate with Mathematics & Physics"
            }
          ],
          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 77,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 77,
            year2023: 78,
            year2022: 79
          },
          similarPrograms: [
            {
              name: "BS Artificial Intelligence",
              merit: 75
            },
            {
              name: "BS Cyber Security",
              merit: 81
            },
            {
              name: "BS Data Science",
              merit: 74
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        },
        // ================= SOFTWARE ENGINEERING =================
        {
          name: "Software Engineering",
          fee: "71,140 / Semester",
          courses: [
            "BS Software Engineering"
          ],
          programs: [
            {
              title: "BS Software Engineering",
              duration: "4 Years",
              eligibility: "At least 50% marks in ICS, F.Sc Pre-Engineering, or Intermediate with Mathematics & Physics. Max age 24 years.",
              requiredDegree: "ICS, F.Sc Pre-Engineering, or Intermediate with Mathematics & Physics"
            }
          ],
          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 75,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 76,
            year2023: 78,
            year2022: 80
          },
          similarPrograms: [
            {
              name: "BS Cyber Security",
              merit: 81
            },
            {
              name: "BS Information Technology",
              merit: 77
            },
            {
              name: "BS Computer Science",
              merit: 77
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        },
        // ================= PHARMACY =================
        {
          name: "Pharmacy",
          fee: "58,840 / Semester",
          courses: [
            "Pharm.D Morning"
          ],
          programs: [
            {
              title: "Pharm.D Morning",
              duration: "5 Years",
              eligibility: "The candidates holding F.Sc. (Pre-Medical with 60% marks) shall be eligible in Pharm-D and not more than 24 years of age",
              requiredDegree: "F.Sc. (Pre-Medical)"
            }
          ],
          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 81,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 82,
            year2023: 83,
            year2022: 84
          },
          similarPrograms: [
            {
              name: "BS Medical Lab Technology",
              merit: 74
            },
            {
              name: "Doctor of Physical Therapy",
              merit: 70
            },
            {
              name: "Pharm.D",
              merit: 81
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        },
        // ================= LAW =================
        {
          name: "Law",
          fee: "61,840 / Semester",
          courses: [
            "LLB 05-Yrs Morning Program"
          ],
          programs: [
            {
              title: "LLB 05-Yrs Morning Program",
              duration: "5 Years",
              eligibility: "Intermediate (F.A/F.Sc/ICS/I.Com/A-Level) or equivalent with HEC Law Admission Test (LAT) compulsory. Max age 24 years.",
              requiredDegree: "Intermediate (F.A/F.Sc/ICS/I.Com/A-Level) or equivalent"
            }
          ],

          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 74,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 75,
            year2023: 76,
            year2022: 78
          },
          similarPrograms: [
            {
              name: "BS Media Studies",
              merit: 67
            },
            {
              name: "BS International Relations",
              merit: 67
            },
            {
              name: "BS Political Science",
              merit: 67
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        },

        // ================= BUSINESS ADMINISTRATION =================
        {
          name: "Business Administration",
          fee: "58,840 / Semester",
          courses: [
            "BBA Hons Morning",
            "BBA Hons Afternoon Self Supporting"
          ],
          programs: [
            {
              title: "BBA Hons Morning",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "Intermediate or equivalent"
            },
            {
              title: "BBA Hons Afternoon Self Supporting",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "Intermediate or equivalent"
            }
          ],

          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 73,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 73,
            year2023: 74,
            year2022: 75
          },
          similarPrograms: [
            {
              name: "BS Accounting and Taxation",
              merit: 68
            },
            {
              name: "BS Accounting and Finance",
              merit: 68
            },
            {
              name: "BS Business Economics",
              merit: 70
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        },
        // ================= ECONOMICS =================
        {
          name: "Economics",
          fee: "52,280 / Semester",
          courses: [
            "BS Economics Regular",
            "BS Economics Self Supporting",
            "BS Business Economics"
          ],
          programs: [
            {
              title: "BS Economics Regular",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "F.A/F.Sc./A-levels or equivalent"
            },
            {
              title: "BS Economics Self Supporting",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "F.A/F.Sc./A-levels or equivalent"
            },
            {
              title: "BS Business Economics",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "F.A/F.Sc./A-levels or equivalent"
            }
          ],
          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 70,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 71,
            year2023: 72,
            year2022: 74
          },
          similarPrograms: [
            {
              name: "BBA Hons",
              merit: 65
            },
            {
              name: "BS Accounting and Taxation",
              merit: 68
            },
            {
              name: "BS Commerce",
              merit: 68
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        },
        // ================= COMMERCE =================
        {
          name: "Commerce",
          fee: "47,165 - 62,415 / Semester",
          courses: [
            "BS Commerce Morning",
            "BS Accounting and Finance",
            "BS Accounting and Taxation",
            "BS E-Commerce"
          ],
          programs: [
            {
              title: "BS Commerce Morning",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "Intermediate or equivalent"
            },
            {
              title: "BS Accounting and Finance",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "Intermediate or equivalent"
            },
            {
              title: "BS Accounting and Taxation",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "Intermediate or equivalent"
            },
            {
              title: "BS E-Commerce",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "Intermediate or equivalent"
            }
          ],
          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 68,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 69,
            year2023: 70,
            year2022: 71
          },
          similarPrograms: [
            {
              name: "BBA Hons",
              merit: 65
            },
            {
              name: "BS Accounting and Taxation",
              merit: 68
            },
            {
              name: "BS Accounting and Finance",
              merit: 68
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        },
        // ================= ENGLISH =================
        {
          name: "English",
          fee: "52,280 / Semester",
          courses: [
            "BS English Literature Regular",
            "BS English Literature Self-Supporting"
          ],
          programs: [
            {
              title: "BS English Literature Regular",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "FA / FSc / A-Level or Equivalent"
            },
            {
              title: "BS English Literature Self-Supporting",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "FA / FSc / A-Level or Equivalent"
            }
          ],
          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 65,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 65,
            year2023: 67,
            year2022: 70
          },
          similarPrograms: [
            {
              name: "BS Applied Psychology",
              merit: 74
            },
            {
              name: "BS Political Science",
              merit: 67
            },
            {
              name: "BS International Relations",
              merit: 67
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        },
        // ================= PSYCHOLOGY =================
        {
          name: "Psychology",
          fee: "52,280 / Semester",
          courses: [
            "BS Applied Psychology",
            "BS Clinical Psychology"
          ],
          programs: [
            {
              title: "BS Applied Psychology",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "F.A./F.Sc. or equivalent"
            },
            {
              title: "BS Clinical Psychology",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "F.A./F.Sc. or equivalent"
            }
          ],
          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 74,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 75,
            year2023: 76,
            year2022: 77
          },
          similarPrograms: [
            {
              name: "BS Media Studies",
              merit: 67
            },
            {
              name: "BS International Relations",
              merit: 67
            },
            {
              name: "BS Political Science",
              merit: 67
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        },
        // ================= POLITICAL SCIENCE =================
        {
          name: "Political Science",
          fee: "42,590 / Semester",
          courses: [
            "BS Political Science",
            "BS International Relations"
          ],
          programs: [
            {
              title: "BS Political Science",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "Intermediate or Equivalent"
            },
            {
              title: "BS International Relations",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "Intermediate or Equivalent"
            }
          ],

          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 67,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 68,
            year2023: 69,
            year2022: 70
          },
          similarPrograms: [
            {
              name: "BS Media Studies",
              merit: 67
            },
            {
              name: "BS International Relations",
              merit: 67
            },
            {
              name: "BS Applied Psychology",
              merit: 74
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        },
        // ================= MEDIA STUDIES =================
        {
          name: "Media Studies",
          fee: "52,280 / Semester",
          courses: [
            "BS Communication Studies",
            "BS Journalism Studies",
            "BS Digital Media & Communication",
            "BS Media & Development Communication"
          ],
          programs: [
            {
              title: "BS Communication Studies",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "FA / F.Sc / I.Com / D.Com / Intermediate or Equivalent"
            },
            {
              title: "BS Journalism Studies",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "FA / F.Sc / I.Com / D.Com / Intermediate or Equivalent"
            },
            {
              title: "BS Digital Media & Communication",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "FA / F.Sc / I.Com / D.Com / Intermediate or Equivalent"
            },
            {
              title: "BS Media & Development Communication",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "FA / F.Sc / I.Com / D.Com / Intermediate or Equivalent"
            }
          ],
          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 67,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 67,
            year2023: 68,
            year2022: 70
          },
          similarPrograms: [
            {
              name: "BS English Literature",
              merit: 66
            },
            {
              name: "BS Applied Psychology",
              merit: 74
            },
            {
              name: "BS International Relations",
              merit: 67
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        },
        // ================= MATHEMATICS =================
        {
          name: "Mathematics",
          fee: "52,280 / Semester",
          courses: [
            "BS Mathematics Morning",
            "BS Mathematics Self-Supporting"
          ],
          programs: [
            {
              title: "BS Mathematics Morning",
              duration: "4 Years",
              eligibility: "Intermediate or equivalent with a subject of Mathematics or Physics. Max age 24 years.",
              requiredDegree: "Intermediate with Math/Physics (F.Sc/ICS/A-Level)"
            },
            {
              title: "BS Mathematics Self-Supporting",
              duration: "4 Years",
              eligibility: "Intermediate or equivalent with a subject of Mathematics or Physics. Max age 24 years.",
              requiredDegree: "Intermediate with Math/Physics (F.Sc/ICS/A-Level)"
            }
          ],
          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 66,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 66,
            year2023: 67,
            year2022: 68
          },
          similarPrograms: [
            {
              name: "BS Computational Physics",
              merit: 67
            },
            {
              name: "BS Statistics",
              merit: 65
            },
            {
              name: "BS Chemistry",
              merit: 64
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        },
        // ================= PHYSICS =================
        {
          name: "Physics",
          fee: "53,480 / Semester",
          courses: [
            "BS Physics",
            "BS Electronics",
            "BS Computational Physics"
          ],
          programs: [
            {
              title: "BS Physics",
              duration: "4 Years",
              eligibility: "Intermediate or equivalent with a subject of Mathematics or Physics. Max age 24 years.",
              requiredDegree: "Intermediate with Math/Physics (F.Sc/ICS/A-Level)"
            },
            {
              title: "BS Electronics",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "F.A/F.Sc or equivalent"
            },
            {
              title: "BS Computational Physics",
              duration: "4 Years",
              eligibility: "Intermediate or equivalent with a subject of Mathematics or Physics. Max age 24 years.",
              requiredDegree: "Intermediate with Math/Physics (F.Sc/ICS/A-Level)"
            }
          ],
          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 67,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 68,
            year2023: 69,
            year2022: 71
          },
          similarPrograms: [
            {
              name: "BS Statistics",
              merit: 65
            },
            {
              name: "BS Mathematics",
              merit: 70
            },
            {
              name: "BS Chemistry",
              merit: 64
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        },
        // ================= CHEMISTRY =================
        {
          name: "Chemistry",
          fee: "52,280 / Semester",
          courses: [
            "BS Chemistry"
          ],
          programs: [
            {
              title: "BS Chemistry",
              duration: "4 Years",
              eligibility: "Intermediate or equivalent with a subject of Mathematics or Physics. Max age 24 years.",
              requiredDegree: "Intermediate with Math/Physics (F.Sc/ICS/A-Level)"
            }
          ],
          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 64,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 65,
            year2023: 67,
            year2022: 70
          },
          similarPrograms: [
            {
              name: "BS Physics",
              merit: 68
            },
            {
              name: "BS Mathematics",
              merit: 70
            },
            {
              name: "BS Statistics",
              merit: 65
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        },
        // ================= STATISTICS =================
        {
          name: "Statistics",
          fee: "42,390 - 47,165 / Semester",
          courses: [
            "BS Statistics",
            "BS Biostatistics",
            "BS Computational Statistics and Data Analytics"
          ],
          programs: [
            {
              title: "BS Statistics",
              duration: "4 Years",
              eligibility: "Intermediate or equivalent with a subject of Mathematics or Physics. Max age 24 years.",
              requiredDegree: "Intermediate with Math/Physics (F.Sc/ICS/A-Level)"
            },
            {
              title: "BS Biostatistics",
              duration: "4 Years",
              eligibility: "Intermediate or equivalent with a subject of Mathematics or Physics. Max age 24 years.",
              requiredDegree: "Intermediate with Math/Physics (F.Sc/ICS/A-Level)"
            },
            {
              title: "BS Computational Statistics and Data Analytics",
              duration: "4 Years",
              eligibility: "Intermediate or equivalent with a subject of Mathematics or Physics. Max age 24 years.",
              requiredDegree: "Intermediate with Math/Physics (F.Sc/ICS/A-Level)"
            }
          ],
          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 68,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 69,
            year2023: 71,
            year2022: 72
          },
          similarPrograms: [
            {
              name: "BS Mathematics",
              merit: 70
            },
            {
              name: "BS Physics",
              merit: 68
            },
            {
              name: "BS Computational Physics",
              merit: 67
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        },
        // ================= BIOCHEMISTRY =================
        {
          name: "Biochemistry",
          fee: "58,840 / Semester",

          courses: [
            "BS Biochemistry",
            "BS Biotechnology"
          ],
          programs: [
            {
              title: "BS Biochemistry",
              duration: "4 Years",
              eligibility: "Intermediate or equivalent with a subject of Mathematics or Physics. Max age 24 years.",
              requiredDegree: "Intermediate with Math/Physics (F.Sc/ICS/A-Level)"
            },
            {
              title: "BS Biotechnology",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "F.A/F.Sc or equivalent"
            }
          ],

          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 70,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 70,
            year2023: 72,
            year2022: 74
          },
          similarPrograms: [
            {
              name: "BS Microbiology",
              merit: 60
            },
            {
              name: "BS Botany",
              merit: 60
            },
            {
              name: "BS Zoology",
              merit: 63
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        },

        // ================= ZOOLOGY =================
        {
          name: "Zoology",
          fee: "58,840 / Semester",

          courses: [
            "BS Zoology"
          ],
          programs: [
            {
              title: "BS Zoology",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "F.A/F.Sc or equivalent"
            }
          ],

          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 63,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 63,
            year2023: 65,
            year2022: 68
          },
          similarPrograms: [
            {
              name: "BS Microbiology",
              merit: 60
            },
            {
              name: "BS Botany",
              merit: 60
            },
            {
              name: "BS Biochemistry",
              merit: 70
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        },

        // ================= BOTANY =================
        {
          name: "Botany",
          fee: "52,280 / Semester",

          courses: [
            "BS Botany"
          ],
          programs: [
            {
              title: "BS Botany",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "F.A/F.Sc or equivalent"
            }
          ],

          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 60,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 61,
            year2023: 62,
            year2022: 64
          },
          similarPrograms: [
            {
              name: "BS Biotechnology",
              merit: 68
            },
            {
              name: "BS Biochemistry",
              merit: 70
            },
            {
              name: "BS Microbiology",
              merit: 60
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        },

        // ================= GEOLOGY =================
        {
          name: "Geology",
          fee: "42,390 / Semester",

          courses: [
            "BS Applied Geology"
          ],
          programs: [
            {
              title: "BS Applied Geology",
              duration: "4 Years",
              eligibility: "Intermediate or equivalent with a subject of Mathematics or Physics. Max age 24 years.",
              requiredDegree: "Intermediate with Math/Physics (F.Sc/ICS/A-Level)"
            }
          ],

          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 68,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 69,
            year2023: 70,
            year2022: 71
          },
          similarPrograms: [
            {
              name: "BS Statistics",
              merit: 65
            },
            {
              name: "BS Mathematics",
              merit: 70
            },
            {
              name: "BS Chemistry",
              merit: 64
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        },
        // ================= ENVIRONMENTAL SCIENCES =================
        {
          name: "Environmental Sciences",
          fee: "42,390 / Semester",

          courses: [
            "BS Environmental Sciences",
            "BS Hydrology and Water Resources Management",
            "BS Tourism and Hospitality Management"
          ],
          programs: [
            {
              title: "BS Environmental Sciences",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "F.A/F.Sc or equivalent"
            },
            {
              title: "BS Hydrology and Water Resources Management",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "F.A/F.Sc or equivalent"
            },
            {
              title: "BS Tourism and Hospitality Management",
              duration: "4 Years",
              eligibility: "At least 45% marks in Intermediate (HSSC) or equivalent. Max age 24 years.",
              requiredDegree: "F.A/F.Sc or equivalent"
            }
          ],

          meritFormula: {
            formulaType: "pu",
            matric: 0.25,
            inter: 0.75,
            entryTest: 0.25,
            academic: 0.75,
            requiredMerit: 65,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 66,
            year2023: 67,
            year2022: 68
          },
          similarPrograms: [
            {
              name: "BS Biotechnology",
              merit: 68
            },
            {
              name: "BS Biochemistry",
              merit: 70
            },
            {
              name: "BS Botany",
              merit: 60
            }
          ],
          applyLink: "http://admissions.pu.edu.pk/"
        }
      ]
    },
    {
      name: "GC University Faisalabad",
      city: "Faisalabad",
      type: "Public",
      averageFee: 90000,
      hostel: true,
      logo: "gcuf",
      website: "https://gcuf.edu.pk",
      departments: [

        // ================= COMPUTER SCIENCE =================
        {
          name: "Computer Science",
          fee: "53,900 / Semester",
          courses: [
            "BS Computer Science",
            "BS Software Engineering",
            "BS Information Technology",
            "BS Data Science",
            "BS Data Analytics",
            "BS Bioinformatics"
          ],
          programs: [
            {
              title: "BS Computer Science",
              duration: "4 Years",
              eligibility: "50% marks in Intermediate or equivalent. Max age 24 years.",
              requiredDegree: "Intermediate / Equivalent"
            },
            {
              title: "BS Software Engineering",
              duration: "4 Years",
              eligibility: "50% marks in Intermediate or equivalent. Max age 24 years.",
              requiredDegree: "Intermediate / Equivalent"
            },
            {
              title: "BS Information Technology",
              duration: "4 Years",
              eligibility: "50% marks in Intermediate or equivalent. Max age 24 years.",
              requiredDegree: "Intermediate / Equivalent"
            },
            {
              title: "BS Data Science",
              duration: "4 Years",
              eligibility: "50% marks in Intermediate or equivalent. Max age 24 years.",
              requiredDegree: "Intermediate / Equivalent"
            },
            {
              title: "BS Data Analytics",
              duration: "4 Years",
              eligibility: "50% marks in Intermediate or equivalent. Max age 24 years.",
              requiredDegree: "Intermediate / Equivalent"
            },
            {
              title: "BS Bioinformatics",
              duration: "4 Years",
              eligibility: "50% marks in Intermediate or equivalent. Max age 24 years.",
              requiredDegree: "Intermediate / Equivalent"
            }
          ],

          meritFormula: {
            formulaType: "gcuf-general",
            matric: 0.1,
            inter: 0.9,
            entryTest: 0,
            requiredMerit: 72,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 72,
            year2023: 73,
            year2022: 76
          },
          similarPrograms: [
            {
              name: "Radiography",
              merit: 75
            },
            {
              name: "Medical Lab Technology",
              merit: 75
            },
            {
              name: "Operation Theater Technology",
              merit: 75
            }
          ]
          ,
          applyLink: "https://admissions.gcuf.edu.pk/"
        },

        // ================= PHARM-D =================
        {
          name: "Pharmacy",
          fee: "74,200 / Semester",
          courses: ["Pharm-D"],
          programs: [
            {
              title: "Pharm-D",
              duration: "5 Years",
              eligibility: "60% marks in FSc / A Level or equivalent. Max age 24 years.",
              requiredDegree: "FSc / A Level"
            }
          ],

          meritFormula: {
            formulaType: "gcuf-general",
            matric: 0.1,
            inter: 0.9,
            entryTest: 0,
            requiredMerit: 78,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 79,
            year2023: 80,
            year2022: 83
          },
          similarPrograms: [
            {
              name: "Radiography",
              merit: 75
            },
            {
              name: "Pharm-D",
              merit: 78
            },
            {
              name: "Orthotics and Prosthetics",
              merit: 75
            }
          ],
          applyLink: "https://admissions.gcuf.edu.pk/"
        },

        // ================= DPT =================
        {
          name: "Allied Health Sciences",
          fee: "43,300 - 57,300 / Semester",
          courses: [
            "Doctor of Physical Therapy",
            "Medical Lab Technology",
            "Radiography & Imaging Technology",
            "Operation Theater Technology",
            "Orthotics and Prosthetics"
          ],
          programs: [
            {
              title: "Doctor of Physical Therapy",
              duration: "5 Years",
              eligibility: "60% marks in FSc / A Level or equivalent. Max age 24 years.",
              requiredDegree: "FSc / A Level"
            },
            {
              title: "Medical Lab Technology",
              duration: "4 Years",
              eligibility: "60% marks in FSc / A Level or equivalent. Max age 24 years.",
              requiredDegree: "FSc / A Level"
            },
            {
              title: "Radiography & Imaging Technology",
              duration: "4 Years",
              eligibility: "60% marks in FSc / A Level or equivalent. Max age 24 years.",
              requiredDegree: "FSc / A Level"
            },
            {
              title: "Operation Theater Technology",
              duration: "4 Years",
              eligibility: "60% marks in FSc / A Level or equivalent. Max age 24 years.",
              requiredDegree: "FSc / A Level"
            },
            {
              title: "Orthotics and Prosthetics",
              duration: "4 Years",
              eligibility: "60% marks in FSc / A Level or equivalent. Max age 24 years.",
              requiredDegree: "FSc / A Level"
            }
          ],

          meritFormula: {
            formulaType: "gcuf-general",
            matric: 0.1,
            inter: 0.9,
            entryTest: 0,
            requiredMerit: 75,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 76,
            year2023: 78,
            year2022: 80
          },
          similarPrograms: [
            {
              name: "Medical Lab Technology",
              merit: 75
            },
            {
              name: "Operation Theater Technology",
              merit: 75
            },
            {
              name: "Orthotics and Prosthetics",
              merit: 75
            }
          ]
          ,
          applyLink: "https://admissions.gcuf.edu.pk/"
        },
        // ================= ELECTRICAL ENGINEERING =================
        {
          name: "Electrical Engineering",
          fee: "69,900 / Semester",
          courses: ["BS Electrical Engineering"],
          programs: [
            {
              title: "BS Electrical Engineering",
              duration: "4 Years",
              eligibility: "60% marks in FSc / A Level or equivalent. Max age 24 years.",
              requiredDegree: "FSc / A Level"
            }
          ],

          meritFormula: {
            formulaType: "gcuf-ee",
            matric: 0.17,
            inter: 0.50,
            entryTest: 0.33,
            requiredMerit: 73,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 73,
            year2023: 74,
            year2022: 76
          },
          similarPrograms: [
            {
              name: "B.E.Tech Electrical",
              merit: 66
            },
            {
              name: "B.E.Tech Mechanical",
              merit: 66
            },
            {
              name: "B.E.Tech Civil",
              merit: 66
            }
          ]
          ,
          applyLink: "https://admissions.gcuf.edu.pk/"
        },

        // ================= B.E.TECH =================
        {
          name: "Engineering Technology",
          fee: "61,400 / Semester",
          courses: [
            "B.E.Tech Electrical",
            "B.E.Tech Mechanical",
            "B.E.Tech Civil",
            "B.E.Tech Chemical"
          ],
          programs: [
            {
              title: "B.E.Tech Electrical",
              duration: "4 Years",
              eligibility: "50% marks in Intermediate or equivalent. Max age 24 years.",
              requiredDegree: "Intermediate / Equivalent"
            },
            {
              title: "B.E.Tech Mechanical",
              duration: "4 Years",
              eligibility: "50% marks in Intermediate or equivalent. Max age 24 years.",
              requiredDegree: "Intermediate / Equivalent"
            },
            {
              title: "B.E.Tech Civil",
              duration: "4 Years",
              eligibility: "50% marks in Intermediate or equivalent. Max age 24 years.",
              requiredDegree: "Intermediate / Equivalent"
            },
            {
              title: "B.E.Tech Chemical",
              duration: "4 Years",
              eligibility: "50% marks in Intermediate or equivalent. Max age 24 years.",
              requiredDegree: "Intermediate / Equivalent"
            }
          ],

          meritFormula: {
            formulaType: "gcuf-btech",
            matric: 0,
            inter: 0.70,
            entryTest: 0.30,
            requiredMerit: 66,
            entryTestRequired: true
          },
          cutoffHistory: {
            year2024: 66,
            year2023: 68,
            year2022: 69
          },
          similarPrograms: [
            {
              name: "B.E.Tech Chemical",
              merit: 66
            },
            {
              name: "BS Electrical Engineering",
              merit: 73
            },
            {
              name: "B.E.Tech Mechanical",
              merit: 66
            }
          ]
          ,
          applyLink: "https://admissions.gcuf.edu.pk/"
        }
      ]
    }
  ]);

  console.log("Data Seeded");
  process.exit();
};

seed();