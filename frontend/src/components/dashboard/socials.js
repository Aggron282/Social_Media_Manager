const Socials = (props) => {
  return(
    <div class="socials_container">
      <div class="social-grid">
        <div class="add-social" onClick = {props.toggleSocialMenu}>
          + Social
        </div>
      </div>
    </div>

  )
}


export default Socials;
