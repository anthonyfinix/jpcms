import { shallow } from "enzyme"
import UserProvider, { UserContext } from "./index"

describe("User Provider", () => {
    it("should Access localStorage", () => {
        const TestComponent = () => {
            return (
                <h1>Test Component</h1>
            )
        }
        let wrapper = shallow(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        )
    })
})