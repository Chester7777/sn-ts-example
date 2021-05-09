import React from "react";
import ProfileStatus from "./ProfileStatus";
import {create, ReactTestInstance} from "react-test-renderer";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus updateStatus={() => {
        }} status="it_kamasutra.com"/>);
        const instance = component.getInstance();
        // @ts-ignore
        expect(instance.state.status).toBe("it_kamasutra.com");
    });
    test("after creation <span> with status should be displayed", () => {
        const component = create(<ProfileStatus updateStatus={() => {
        }} status="it_kamasutra.com"/>);
        const root = component.root;
        let span = root.findByType("span")
        // @ts-ignore
        expect(span.length).toBe(1);
    });
    test("after creation <span> should contains correct status", () => {
        const component = create(<ProfileStatus updateStatus={() => {
        }} status="it_kamasutra.com"/>);
        const root = component.root;
        let span = root.findByType("span")
        // @ts-ignore
        expect(span.innreText).toBe("it_kamasutra.com");
    });
    test("after creation <input> shouldn`t displayed", () => {
        const component = create(<ProfileStatus updateStatus={() => {
        }} status="it_kamasutra.com"/>);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });
    test("after creation <span> should contains correct", () => {
        const component = create(<ProfileStatus updateStatus={() => {}} status="it_kamasutra.com"/>);
        const root = component.root;
        let span = root.findByType("span")
        expect(span.children[0]).toBe("it_kamasutra.com");
    });
    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus updateStatus={() => {}} status="it_kamasutra.com"/>);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("it_kamasutra.com");
    });
    test("callback should be called", () => {
        let mockCallback = jest.fn();
        const component = create(<ProfileStatus updateStatus={mockCallback} status="it_kamasutra.com"/>);
        const instance = component.getInstance();
        //@ts-ignore
        if(instance) instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1);
    });

});