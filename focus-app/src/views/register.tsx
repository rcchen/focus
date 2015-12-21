import React = require('react');
import ReactDOM = require('react-dom');

interface IRegisterState {
    email: string;
    password: string;
}

export class Register extends React.Component<{}, IRegisterState> {
    private static EMAIL_INPUT = "email";
    private static PASSWORD_INPUT = "password";

    public state: IRegisterState = {
        email: null,
        password: null
    };

    public render() {
        return (
            <div className="focus-register">
                <h1>Register</h1>
                <form onChange={this.onChange} onSubmit={this.onSubmit}>
                    <input type="text" name={Register.EMAIL_INPUT} />
                    <input type="password" name={Register.PASSWORD_INPUT} />
                    <button type="submit">Submit</button>
                </form>
            </div>  
        );
    }

    private onChange(e: React.FormEvent) {
        const element = e.target as HTMLInputElement;
        const state = JSON.parse(JSON.stringify(this.state)) as IRegisterState;
        switch (element.name) {
            case Register.EMAIL_INPUT:
                state.email = element.value;
                break;
            case Register.PASSWORD_INPUT:
                state.password = element.value;
                break;
        }
        this.setState(state);
    }

    private onSubmit(e: React.FormEvent) {
        e.preventDefault();
        window.fetch("https://localhost:8081/api/v1/users", {
            body: JSON.stringify({
                
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "post"
        })
    }
}
