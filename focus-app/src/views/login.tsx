import React = require('react');

export class Login extends React.Component<{}, {}> {
    public render() {
        return (
            <div className="focus-login">
                <h1>Login</h1>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="email" />
                    <input type="password" name="password" />
                    <button type="submit">Submit</button>
                </form>
            </div>  
        );
    }

    private onSubmit(e: React.FormEvent) {
        e.preventDefault();
        window.fetch("https://localhost:8081/api/v1/users", {
            method: "post"
        });
    }
}
