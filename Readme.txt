concurrently
useState, useLocation, useNavigate, useSelector, useDispatch
Redux for state management
Added a spinner
Protected And public route wrapping logic
children as a prop
... spread operator
Wrapping Ex. The HomePage component is wrapped inside the Layout component.
<Layout>
  <HomePage />
</Layout>

Rendering sidebar-menu according to user and admin
i and a tags
font-awesome for diff icons and antd for designing pages
Highlighting the tab on which we are present 
sending requests via axios
Timepicker for setting time
Tabs.TabPane for read, unread tab
Admin able to see notifs of user that they want to become a doctor
Sending all notifs from unread to read once admin sees them
deleting all notifs 
cursor pointer 
Displaying all doctors and users to the admin with the help of antd
Admin can approve/block users from application
Request approve hone ke bad user ko apply doctor ka option nhi ana chahiye toh sidebar menu pe condition lagayege
Request approve hone ke bad user ab doc hogaya h toh apni profile m change timimgs, fees etc ka option dege use -> he can update his info

req.body.userId-> This comes from the client (frontend) as part of the request body.
axios.post("/api/some-route", {
  userId: "123abc"
});

req.userId
This is set by your backend code, usually by middleware like JWT auth.
const decoded = jwt.verify(token, secret);
req.userId = decoded.id;  // set manually

not sure why did we use post instead of get, he said we need to pass auth middleware
use of moment library with timepicker 
Homepage m sare doctors show krdo user ko with the help of card
agar user kisi doc pe click kre toh wo booking page pe chla jaye
user ko check availability ka option dikhaya and if available book kr ske user appointment
availability fulfil hone se pehle book now ka option disable hona chahiye -> pending
show user his all appointments
booking page pe name -> pending
doctor ko notif toh aagaya ki appointment req ayi h, ab use apne appointment page pe uske liye jo appointments book hui h wo dikhe taki wo
unhe accept/reject kr ske
send notif to user about his appointment update