export default function decorate(block) {
  block.innerHTML = `
<form class="contact-form">
 
      <div class="form-group">
<label>Name</label>
<input type="text" name="firstName" placeholder="Enter your name" required>
</div>
 
      <div class="form-group">
<label>Email</label>
<input type="email" name="email" placeholder="Enter your email" required>
</div>
 
      <div class="form-group">
<label>Phone</label>
<input type="tel" name="phone" placeholder="Enter your phone number" required>
</div>
 
      <div class="form-group">
<label>Message</label>
<textarea name="message" placeholder="Enter your message" required></textarea>
</div>
 
      <button type="submit" class="submit-btn">Submit</button>
 
      <p class="form-message"></p>
 
    </form>
  `;

  const form = block.querySelector('form');
  const message = block.querySelector('.form-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbyjxEVpo8t0QVXH8opAJbJcINGut_QkomYXo34fI17mX_xaLwc4awz_QF3IQ3FtD3A/exec',
        {
          method: 'POST',
          body: formData,
        },
      );

      if (response.ok) {
        message.innerText = '✅ Form submitted successfully!';
        message.style.color = 'green';
        form.reset();
      } else {
        message.innerText = '❌ Submission failed!';
        message.style.color = 'red';
      }
    } catch (error) {
      message.innerText = '⚠️ Error submitting form!';
      message.style.color = 'red';
      console.error(error);
    }
  });
}
