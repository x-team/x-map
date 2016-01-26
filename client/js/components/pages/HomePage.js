import React, { Component } from 'react';
import { Link } from 'react-router';

class HomePage extends Component {
  constructor() {
    super();
    this.state = { visibility: false };
  }

  hidePanel() {
    this.setState({ visibility: true });
  }

  render() {
    const visibility = this.state.visibility ? 'hidden' : '';
    return (
      <div className={'panel homepage ' + visibility}>
        <article>
          <section>
            <h2>Welcome to X-Map</h2>
            <p>Please <Link to="/login">Log in</Link> or <Link to="/register">Register</Link> to proceed.</p>
            <p>An <a href="https://github.com/x-team/x-map/" target="_blank">open source</a> project at <a href="http://x-team.com/community/" target="_blank">X-Team</a></p>
            <button className="button" onClick={this.hidePanel.bind(this)}>Click to hide panel.</button>
          </section>
        </article>

        <hr />

        <article>
          <header>
            <div className="alert error">The following is VALID documentation</div>
            <h1>Base content styles</h1>
            <p>It is not expected complexity in the presentation of the content in this app, most of will be adressed in the map.</p>
          </header>

          <section>
            <h2>Typography</h2>

            <h3>Text:</h3>
            <p>Normal paragraph text. <b>Bold text.</b> <i>Italic text.</i> <em>Emphasized text.</em> <code>Code text.</code> <big>Big text.</big> <small>Small text.</small> <del>Delete text.</del> <ins>Insert text.</ins></p>
            <p><kbd>Keyboard text.</kbd> Text to be entered by the user.</p>
            <p><dfn>Definition text.</dfn> To define the meaning of a word, phrase or term.</p>
            <p>Paragraph with break...<br />...line.</p>

            <h3>Headings:</h3>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>

            <h3>Monospace text:</h3>
            <pre><code>
            #header h1 a<br />
              display: block;<br />
              width: 300px;<br />
              height: 80px;<br />
            </code></pre>

            <h3>Blockquote:</h3>
            <blockquote>
              <p>Paragraph in the blockquote.</p>
              <p>Paragraph in the blockquote. Lorem ipsum. Paragraph in the blockquote. Paragraph in the blockquote. Lorem ipsum. Paragraph in the blockquote. Paragraph in the blockquote.</p>
              <cite>Citation text in the blockquote.</cite>
            </blockquote>

            <h3>Unordered list:</h3>
            <ul>
              <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
              <li>Aliquam tincidunt mauris eu risus.</li>
              <li>Vestibulum auctor dapibus neque.</li>
              <li>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</li>
              <li>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</li>
              <li>Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.</li>
              <li>Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.</li>
            </ul>

            <h3>Ordered List:</h3>
            <ol>
              <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
              <li>Aliquam tincidunt mauris eu risus.</li>
              <li>Vestibulum auctor dapibus neque.</li>
            </ol>

            <h3>Definition list:</h3>
            <dl>
              <dt>Definition list</dt>
              <dd>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.</dd>
              <dt>Lorem ipsum dolor sit amet</dt>
              <dd>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.</dd>
            </dl>

            <h3>Long text sample:</h3>
            <p>Nam rhoncus nunc eget nisi mattis, <code>&lt;img /&gt;</code> id auctor diam hendrerit. Nulla eget imperdiet ante, quis imperdiet odio. Donec faucibus lorem sodales justo accumsan, id imperdiet quam placerat. Curabitur sed bibendum dui. Donec condimentum diam diam. Proin facilisis viverra libero sed dictum. Maecenas fermentum a velit id euismod. Vivamus in eros nec lacus malesuada sagittis nec at eros. Etiam nibh elit, semper sed vulputate eu, posuere vitae nibh. Praesent in vehicula est, id tristique risus. Aliquam erat volutpat. Nulla a erat neque.</p>
            <p><img src="http://placehold.it/350x200" /></p>
            <p>Nam rhoncus nunc eget nisi mattis, id auctor diam hendrerit. <code>&lt;img src="http://placehold.it/350x150" /&gt;</code> Nulla eget imperdiet ante, quis imperdiet odio. Donec faucibus lorem sodales justo accumsan, id imperdiet quam placerat. Curabitur sed bibendum dui. Donec condimentum diam diam. Proin facilisis viverra libero sed dictum. Maecenas fermentum a velit id euismod. Vivamus in eros nec lacus malesuada sagittis nec at eros. Etiam nibh elit, semper sed vulputate eu, posuere vitae nibh. Praesent in vehicula est, id tristique risus. Aliquam erat volutpat. Nulla a erat neque.</p>
            <p>Nam rhoncus nunc eget nisi mattis, id auctor diam hendrerit. Nulla eget imperdiet ante, quis imperdiet odio. Donec faucibus lorem sodales justo accumsan, id imperdiet quam placerat. Curabitur sed bibendum dui. Donec condimentum diam diam. Proin facilisis viverra libero sed dictum. Maecenas fermentum a velit id euismod. Vivamus in eros nec lacus malesuada sagittis nec at eros. Etiam nibh elit, semper sed vulputate eu, posuere vitae nibh. Praesent in vehicula est, id tristique risus. Aliquam erat volutpat. Nulla a erat neque.</p>
          </section>

          <hr />

          <section>
            <h2>Form</h2>
            <form>
              <p>Input:</p>
              <input type="text" name="name" placeholder="text input" />
              <input type="email" name="name" placeholder="email input" />
              <input type="password" name="name" placeholder="password input" />

              <label>
                <p>Textarea:</p>
                <textarea name="textarea"></textarea>
              </label>

              <fieldset>
                <legend>Radio buttons</legend>
                <label>
                  Choice 1: <input type="radio" name="radio-choice[]" value="choice-1" />
                </label>
                <label>
                  Choice 2: <input type="radio" name="radio-choice[]" value="choice-2" />
                </label>
                <label>
                  <input type="radio" name="radio-choice[]" value="choice-1" /> Choice 3
                </label>
                <label>
                  <input type="radio" name="radio-choice[]" value="choice-2" /> Choice 4
                </label>
              </fieldset>

              <fieldset>
                <legend>Checkbox group</legend>
                <label>
                  Checkbox 1: <input type="checkbox" name="checkbox-choice[]" />
                </label>
                <label>
                  Checkbox 2: <input type="checkbox" name="checkbox-choice[]" />
                </label>
                <label>
                  <input type="checkbox" name="checkbox-choice[]" /> Checkbox 3
                </label>
                <label>
                  <input type="checkbox" name="checkbox-choice[]" /> Checkbox 4
                </label>
              </fieldset>

              <label>
                <p>Select Dropdown:</p>
                <select name="select-choice">
                  <option value="Choice 1">Choice 1</option>
                  <option value="Choice 2">Choice 2</option>
                  <option value="Choice 3">Choice 3</option>
                </select>
              </label>

              <p>Buttons</p>
              <button className="button" type="submit">Submit</button>
            </form>
          </section>

          <hr />

          <section>
            <h2>Tables</h2>
            <table>
              <tbody>
                <tr>
                  <th>Email</th>
                  <td>user.email</td>
                </tr>
                <tr>
                  <th>First name</th>
                  <td>user.firstName</td>
                </tr>
                <tr>
                  <th>Last name</th>
                  <td>user.lastName</td>
                </tr>
                <tr>
                  <th>Skype ID</th>
                  <td>user.skypeId</td>
                </tr>
                <tr>
                  <th>X-Team Slack ID</th>
                  <td>user.slackId</td>
                </tr>
                <tr>
                  <th>Website</th>
                  <td>user.website</td>
                </tr>
                <tr>
                  <th>Nationality</th>
                  <td>user.nationality</td>
                </tr>
                <tr>
                  <th>About me</th>
                  <td>user.aboutMe</td>
                </tr>
              </tbody>
            </table>

            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Actions</th>
                  <th>Actions</th>
                  <th>Actions</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>users[id].email</td>
                  <td>users[id].firstName users[id].lastName</td>
                  <td><a>View</a></td>
                  <td><a>View</a></td>
                  <td><a>View</a></td>
                  <td><a>View</a></td>
                </tr>
              </tbody>
            </table>

            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>users[id].email</td>
                  <td>users[id].firstName users[id].lastName</td>
                  <td><a>View</a> <a>View</a> <a>View</a> <a>View</a> <a>View</a> <a>View</a></td>
                </tr>
              </tbody>
            </table>
          </section>

          <hr />

          <section>
            <h2>Media</h2>

            <h3>Images:</h3>
            <img className="center" src="http://placehold.it/100x100" />
            <p><code>&lt;img className="center" src="http://placehold.it/100x100" /&gt;</code></p>

            <img src="http://placehold.it/150x150" />
            <p><code>&lt;img src="http://placehold.it/150x150" /&gt;</code></p>

            <img src="http://placehold.it/350x150" />
            <p><code>&lt;img src="http://placehold.it/350x150" /&gt;</code></p>

            <img src="http://placehold.it/550x150" />
            <p><code>&lt;img src="http://placehold.it/550x150" /&gt;</code></p>

            <audio src="#" controls>
              <p>Fallback content goes here.</p>
            </audio>
          </section>
        </article>

        <hr />

        <article>
          <header>
            <h1>Base layout components styles</h1>
            <p>will have here an arrow for collapsible behavior</p>
          </header>

          <section>
            <h2>Panel</h2>
            <h3>HTML structure Required:</h3>
            <pre><code>
&lt;div className="panel"&gt;Panel component&lt;/div&gt;
            </code></pre>
            <h3>Sample:</h3>
            <div className="panel">Panel component</div>
          </section>

          <section>
            <h2>Collapsible</h2>
            <h3>HTML structure Required:</h3>
            <pre><code>
&lt;article className="collapsible"&gt;<br/>
  &lt;header&gt;<br/>
    &lt;h1&gt;Header h1&lt;/h1&gt;<br/>
  &lt;/header&gt;<br/>
  &lt;section&gt;<br/>
    &lt;h2&gt;Header h2&lt;/h2&gt;<br/>
  &lt;/section&gt;<br/>
  &lt;footer&gt;<br/>
    &lt;h2&gt;Header h2&lt;/h2&gt;<br/>
  &lt;/footer&gt;<br/>
&lt;/article&gt;
            </code></pre>
            <h3>Sample:</h3>
            <article className="collapsible">
              <header>
                <h1>Header h1 in the heaeder</h1>
              </header>
              <section>
                <h2>Header h2 in a section</h2>
              </section>
              <footer>
                <h2>Header h2 in the footer</h2>
              </footer>
            </article>
          </section>

          <section>
            <h2>Navigation</h2>
            <h3>HTML structure Required:</h3>
            <pre><code>
&lt;nav className="navigation"&gt;<br/>
  &lt;a href="#"&gt;Login&lt;/a&gt;<br/>
  &lt;a href="#"&gt;Register&lt;/a&gt;<br/>
&lt;/nav&gt;
            </code></pre>
            <h3>Sample:</h3>
            <nav className="navigation">
              <a href="#">Login</a>
              <a href="#">Register</a>
            </nav>
          </section>

          <section>
            <h2>Alert and messages</h2>
            <h3>HTML structure Required:</h3>
            <pre><code>
&lt;div className="alert error"&gt;Message&lt;/div&gt;
            </code></pre>
            <h3>Sample:</h3>
            <div className="alert error">className="alert error"</div>
            <div className="alert">className="alert"</div>
            <div className="error">className="error"</div>
          </section>

        </article>
      </div>
    );
  }
}

export default HomePage;
